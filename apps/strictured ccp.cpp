#include <WiFi.h>
#include <ArduinoJson.h>
#include <AccelStepper.h>
#include "DHT.h"
#include <HTTPClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Configuration namespace to group all constants
namespace Config {
    // System constants
    constexpr uint8_t NUM_SENSORS = 4;
    constexpr uint16_t JSON_CAPACITY = 1024;
    constexpr uint16_t UPDATE_INTERVAL = 30000;
    
    // Pin definitions
    constexpr uint8_t DHT_PINS[NUM_SENSORS] = {15, 2, 4, 5};
    constexpr uint8_t STEPPER_PIN_1 = 32;
    constexpr uint8_t STEPPER_PIN_2 = 33;
    constexpr uint8_t FAN_PIN = 13;
    constexpr uint8_t HUMIDIFIER_PIN = 12;
    constexpr uint8_t BUTTON_PIN = 23;
    
    // Network configuration
    const char* WIFI_SSID = "Airbox-AB84";
    const char* WIFI_PASSWORD = "76jVJPUReEJb";
    const char* SERVER_URL = "http://192.168.1.184:5000";
    const char* ENDPOINT = "/values";
    const char* API_KEY = "Votre_Cle_API";
    
    // Threshold values
    constexpr float TEMP_THRESHOLD = 36.0f;
    constexpr float HUMIDITY_THRESHOLD = 45.0f;
}

// Structure to hold sensor readings
struct SensorData {
    float temperature;
    float humidity;
    bool valid;
};

// Structure to hold system status
struct SystemStatus {
    bool fanOn = false;
    bool humidifierOn = false;
    int numFailedSensors = 0;
    float avgTemperature = 0;
    float avgHumidity = 0;
};

// Class to manage the climate control system
class ClimateControlSystem {
private:
    DHT* sensors[Config::NUM_SENSORS];
    AccelStepper stepper;
    LiquidCrystal_I2C lcd;
    SystemStatus status;
    HTTPClient http;
    
    // Private helper methods
    void initializeSensors() {
        for (int i = 0; i < Config::NUM_SENSORS; i++) {
            sensors[i] = new DHT(Config::DHT_PINS[i], DHT22);
            sensors[i]->begin();
        }
    }
    
    void initializeOutputs() {
        pinMode(Config::FAN_PIN, OUTPUT);
        pinMode(Config::HUMIDIFIER_PIN, OUTPUT);
        pinMode(Config::BUTTON_PIN, INPUT);
        digitalWrite(Config::FAN_PIN, HIGH);
        digitalWrite(Config::HUMIDIFIER_PIN, HIGH);
    }
    
    SensorData readSensor(int index) {
        SensorData data;
        data.temperature = sensors[index]->readTemperature();
        data.humidity = sensors[index]->readHumidity();
        data.valid = !isnan(data.temperature) && !isnan(data.humidity);
        
        if (!data.valid) {
            data.temperature = 0;
            data.humidity = 0;
            status.numFailedSensors++;
        }
        return data;
    }
    
    void updateAverages(const SensorData* readings) {
        float totalTemp = 0;
        float totalHumidity = 0;
        int validSensors = Config::NUM_SENSORS - status.numFailedSensors;
        
        if (validSensors > 0) {
            for (int i = 0; i < Config::NUM_SENSORS; i++) {
                if (readings[i].valid) {
                    totalTemp += readings[i].temperature;
                    totalHumidity += readings[i].humidity;
                }
            }
            status.avgTemperature = totalTemp / validSensors;
            status.avgHumidity = totalHumidity / validSensors;
        } else {
            status.avgTemperature = 0;
            status.avgHumidity = 0;
        }
    }
    
    String createJsonPayload(const SensorData* readings) {
        DynamicJsonDocument doc(Config::JSON_CAPACITY);
        
        for (int i = 0; i < Config::NUM_SENSORS; i++) {
            String sensorKey = "sensor_" + String(i + 1);
            doc[sensorKey]["temperature"] = readings[i].temperature;
            doc[sensorKey]["humidity"] = readings[i].humidity;
        }
        
        doc["average_temperature"] = status.avgTemperature;
        doc["average_humidity"] = status.avgHumidity;
        doc["fan_status"] = status.fanOn ? "ON" : "OFF";
        doc["humidifier_status"] = status.humidifierOn ? "ON" : "OFF";
        doc["numFailedSensors"] = status.numFailedSensors;
        
        String jsonString;
        serializeJson(doc, jsonString);
        return jsonString;
    }
    
    void displaySensorData(const SensorData* readings) {
        // Display average values
        displayScreen("Average", status.avgTemperature, status.avgHumidity);
        delay(2000);
        
        // Display status
        displayStatus();
        delay(2000);
        
        // Display individual sensor readings
        for (int i = 0; i < Config::NUM_SENSORS; i++) {
            displayScreen("S" + String(i + 1), readings[i].temperature, readings[i].humidity);
            delay(2000);
        }
    }
    
    void displayScreen(const String& label, float temp, float humidity) {
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print(label + " T:");
        lcd.print(temp, 1);
        lcd.print("C");
        lcd.setCursor(0, 1);
        lcd.print("H:");
        lcd.print(humidity, 1);
        lcd.print("%");
    }
    
    void displayStatus() {
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Status R: ");
        lcd.print(status.fanOn ? "ON" : "OFF");
        lcd.setCursor(0, 1);
        lcd.print("Status H: ");
        lcd.print(status.humidifierOn ? "ON" : "OFF");
    }
    
    void handleServerResponse() {
        String url = String(Config::SERVER_URL) + "/getdata?api_key=" + String(Config::API_KEY);
        http.begin(url);
        int responseCode = http.GET();
        
        if (responseCode == 202) {
            DynamicJsonDocument doc(Config::JSON_CAPACITY);
            DeserializationError error = deserializeJson(doc, http.getString());
            
            if (!error) {
                updateControlsFromServer(doc);
            }
        } else {
            autonomousControl();
        }
        http.end();
    }
    
    void updateControlsFromServer(const JsonDocument& doc) {
        // Update motor
        if (doc["Motor"] == "ON") {
            activateStepper();
        } else {
            stopStepper();
        }
        
        // Update fan
        status.fanOn = (doc["FAN"] == "ON");
        digitalWrite(Config::FAN_PIN, status.fanOn ? LOW : HIGH);
        
        // Update humidifier
        status.humidifierOn = (doc["Humidity"] == "ON");
        digitalWrite(Config::HUMIDIFIER_PIN, status.humidifierOn ? LOW : HIGH);
    }
    
    void autonomousControl() {
        if (status.numFailedSensors < Config::NUM_SENSORS) {
            // Control fan
            status.fanOn = (status.avgTemperature < Config::TEMP_THRESHOLD);
            digitalWrite(Config::FAN_PIN, status.fanOn ? LOW : HIGH);
            
            // Control humidifier
            status.humidifierOn = (status.avgHumidity < Config::HUMIDITY_THRESHOLD);
            digitalWrite(Config::HUMIDIFIER_PIN, status.humidifierOn ? LOW : HIGH);
        }
    }
    
    void activateStepper() {
        stepper.moveTo(200);
        stepper.setSpeed(100);
        stepper.runToPosition();
    }
    
    void stopStepper() {
        stepper.setSpeed(0);
        stepper.setCurrentPosition(0);
    }
    
    void checkManualControl() {
        if (digitalRead(Config::BUTTON_PIN) == LOW) {
            activateStepper();
        }
    }

public:
    ClimateControlSystem() : 
        stepper(AccelStepper::FULL4WIRE, Config::STEPPER_PIN_1, Config::STEPPER_PIN_2),
        lcd(0x27, 16, 2) {
        
        // Initialize components
        Serial.begin(115200);
        lcd.init();
        lcd.backlight();
        
        // Initialize WiFi
        WiFi.begin(Config::WIFI_SSID, Config::WIFI_PASSWORD);
        while (WiFi.status() != WL_CONNECTED) {
            delay(1000);
            Serial.println("Connecting to WiFi...");
        }
        Serial.println("Connected to WiFi");
        
        // Initialize hardware
        initializeSensors();
        initializeOutputs();
        
        // Initialize stepper
        stepper.setMaxSpeed(300);
        stepper.setAcceleration(1000);
    }
    
    ~ClimateControlSystem() {
        for (int i = 0; i < Config::NUM_SENSORS; i++) {
            delete sensors[i];
        }
    }
    
    void update() {
        status.numFailedSensors = 0;
        SensorData readings[Config::NUM_SENSORS];
        
        // Read all sensors
        for (int i = 0; i < Config::NUM_SENSORS; i++) {
            readings[i] = readSensor(i);
        }
        
        // Update system state
        updateAverages(readings);
        
        // Send data to server and handle response
        String jsonPayload = createJsonPayload(readings);
        http.begin(String(Config::SERVER_URL) + String(Config::ENDPOINT));
        http.addHeader("Content-Type", "application/json");
        http.addHeader("x-api-key", Config::API_KEY);
        
        int responseCode = http.POST(jsonPayload);
        if (responseCode > 0) {
            handleServerResponse();
        } else {
            autonomousControl();
        }
        
        // Update display and check manual controls
        displaySensorData(readings);
        checkManualControl();
        
        delay(Config::UPDATE_INTERVAL);
    }
};

// Global system instance
ClimateControlSystem climateSystem;

void setup() {
    // Setup is handled in the constructor
}

void loop() {
    climateSystem.update();
}