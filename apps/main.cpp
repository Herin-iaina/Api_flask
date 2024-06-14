#include <WiFi.h>
// #include <WiFiClient.h>
#include <ArduinoJson.h>
#include <AccelStepper.h>
#include "DHT.h"
#include <HTTPClient.h>


// Pin Definitions
#define DHT_SENSOR_TYPE DHT22
#define DHT_1_PIN_DATA   15//5
#define DHT_2_PIN_DATA  2
#define DHT_3_PIN_DATA  4
#define DHT_4_PIN_DATA  5
#define STEPPER_PIN_1 32
#define STEPPER_PIN_2 33
#define FAN_PIN 13
#define HUMIDIFIER_PIN 12
// Définir la broche pour le bouton
#define buttonPin  23

// WiFi credentials
const char* ssid = "Airbox-AB84";
const char* password = "76jVJPUReEJb";

// Server URL and endpoint
const char* serverURL = "http://192.168.1.184:5000";
const char* endpoint = "/values";
// Spécifier l'adresse IP et le port du serveur
IPAddress serverIP(127, 0, 0, 1); 
int serverPort = 5000; 
const char* apiKey = "Votre_Cle_API";


// DHT objects
DHT dht_1(DHT_1_PIN_DATA, DHT_SENSOR_TYPE);
DHT dht_2(DHT_2_PIN_DATA, DHT_SENSOR_TYPE);
DHT dht_3(DHT_3_PIN_DATA, DHT_SENSOR_TYPE);
DHT dht_4(DHT_4_PIN_DATA, DHT_SENSOR_TYPE);

// Stepper motor object
AccelStepper stepper(AccelStepper::FULL4WIRE, STEPPER_PIN_1, STEPPER_PIN_2);

// Fan and humidifier variables
bool fanOn = false;
bool humidifierOn = false;

int numFailedSensors = 0;
int avgFailedSensors = 0;
float avgTemperature = 0;
float avgHumidity    = 0;

void setup() {
  Serial.begin(115200);
  delay(2000);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Initialize DHT sensors
  dht_1.begin();
  dht_2.begin();
  dht_3.begin();
  dht_4.begin();

  // Initialize stepper motor
  stepper.setMaxSpeed(300);
  stepper.setAcceleration(1000);

  // Initialize fan and humidifier pins
  pinMode(FAN_PIN, OUTPUT);
  pinMode(HUMIDIFIER_PIN, OUTPUT);
  digitalWrite(FAN_PIN, HIGH);
  digitalWrite(HUMIDIFIER_PIN, HIGH);
}

void loop() {
  // Read sensor values
  float humidity_1 = dht_1.readHumidity();
  float temperature_1 = dht_1.readTemperature();
  float humidity_2 = dht_2.readHumidity();
  float temperature_2 = dht_2.readTemperature();
  float humidity_3 = dht_3.readHumidity();
  float temperature_3 = dht_3.readTemperature();
  float humidity_4 = dht_4.readHumidity();
  float temperature_4 = dht_4.readTemperature();

  // Check if any sensor values are invalid
    if (isnan(humidity_1) || isnan(temperature_1)) {
      humidity_1  = 0;
      temperature_1 = 0;
      numFailedSensors++;
    }
    if (isnan(humidity_2) || isnan(temperature_2)) {
      temperature_2 = 0;
      humidity_2 = 0;
      numFailedSensors++;
    }
    if (isnan(humidity_3) || isnan(temperature_3)) {
      temperature_3 = 0;
      humidity_3 = 0;
      numFailedSensors++;
    }
    if (isnan(humidity_4) || isnan(temperature_4)) {
      temperature_4 = 0;
      humidity_4 = 0;
      numFailedSensors++;
    }

    // Calculate average temperature and humidity
    switch (numFailedSensors)
    {

      case 0:
        avgTemperature = (temperature_1 + temperature_2 + temperature_3 + temperature_4) / 4;
        avgHumidity = (humidity_1 + humidity_2 + humidity_3 + humidity_4) / 4;
        break;
        
      case 1:
        avgTemperature = (temperature_1 + temperature_2 + temperature_3 + temperature_4)/3;
        avgHumidity = (humidity_1 + humidity_2 + humidity_3 + humidity_4) / 3;
        break;

      case 2:
        avgTemperature = (temperature_1 + temperature_2 + temperature_3 + temperature_4)/numFailedSensors;
        avgHumidity = (humidity_1 + humidity_2 + humidity_3 + humidity_4) / 2;
        break;

      case 3:
        avgTemperature = (temperature_1 + temperature_2 + temperature_3 + temperature_4);
        avgHumidity = (humidity_1 + humidity_2 + humidity_3 + humidity_4);
        break;

      case 4:
        avgTemperature = 0;
        avgHumidity    = 0;
        break;
    }
      

  // Calculate average temperature and humidity
  //float avgTemperature = (temperature_1 + temperature_2 + temperature_3 + temperature_4) / 4;
  //float avgHumidity = (humidity_1 + humidity_2 + humidity_3 + humidity_4) / 4;

  // Create JSON payload
  DynamicJsonDocument payload(1024);
  payload["sensor_1"]["humidity"] = humidity_1;
  payload["sensor_1"]["temperature"] = temperature_1;
  payload["sensor_2"]["humidity"] = humidity_2;
  payload["sensor_2"]["temperature"] = temperature_2;
  payload["sensor_3"]["humidity"] = humidity_3;
  payload["sensor_3"]["temperature"] = temperature_3;
  payload["sensor_4"]["humidity"] = humidity_4;
  payload["sensor_4"]["temperature"] = temperature_4;
  payload["average_temperature"] = avgTemperature;
  payload["average_humidity"] = avgHumidity;
  payload["fan_status"] = fanOn ? "ON" : "OFF";
  payload["humidifier_status"] = humidifierOn ? "ON" : "OFF";
  payload["numFailedSensors"] = numFailedSensors;

  // Serialize JSON payload
  String jsonPayload;
  serializeJson(payload, jsonPayload);
  //Serial.println(jsonPayload);

//  // Établir une connexion TCP/IP
//   WiFiClient client;
  
//   if (!client.connect(serverIP, serverPort)) {
//     Serial.println("Impossible de se connecter au serveur");
//     return;
//   }

  // Send POST request to server
  //WiFiClient client;
  //if (client.connect(serverURL, 80)) {
   // Serial.println("Connected to server");
   // client.println("POST " + String(endpoint) + " HTTP/1.1");
   // client.println("Host: " + String(serverURL));
 //   client.println("Content-Type: application/json");
   // client.println("Content-Length: " + String(jsonPayload.length()));
  //  client.println();
  //  client.println(jsonPayload);
  //  client.println();
 // } else {
   // Serial.println("Failed to connect to server");
 // }

    HTTPClient http;

    //String url = "http://" + String(serverIP) + ":" + String(serverPort) + endpoint;
    String url = String(serverURL)+ String(endpoint);
     http.begin(url);
    http.begin(url);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("x-api-key", apiKey);

    // Envoi de la requête HTTP POST
    int httpResponseCode = http.POST(jsonPayload);

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    String response = http.getString();
    Serial.println("Server response:");
    Serial.println(response);
  } else {
    Serial.print("HTTP POST Request failed: ");
    Serial.println(httpResponseCode);
  }
  // Libérer les ressources
  //http.end();


  // Initialiser l'objet HTTPClient
  // HTTPClient http;
  url = String(serverURL) + "/getdata" + "?api_key=" + String(apiKey);

 // Commencer une nouvelle requête GET
  http.begin(url);

  // Envoyer la requête GET
   httpResponseCode = http.GET();

  if (httpResponseCode > 0 && httpResponseCode == 202) {
    Serial.print("Code de réponse HTTP : ");
    Serial.println(httpResponseCode);

    // Lire la réponse du serveur
    String response = http.getString();
    Serial.println("Réponse du serveur :");
    Serial.println(response);

    DynamicJsonDocument responses(1024);

    // Désérialiser la réponse JSON
    DeserializationError error = deserializeJson(responses, response);

    if (!error) {
      String motorStatus = responses["Motor"];
      String fanStatus = responses["FAN"];
      String humidityStatus = responses["Humidity"];

      // Contrôle du moteur
      if (motorStatus == "ON") {
        // Bouger le moteur pas à pas
        stepper.moveTo(200);
        stepper.setSpeed(100);
        stepper.runToPosition();
      } else {
        // Arrêter le moteur pas à pas
        stepper.setSpeed(0);
        stepper.setCurrentPosition(0);
      }

      // Contrôle du ventilateur (relays ON -> true = NC rigth)
      if (fanStatus == "ON" ) {
        // Allumer le ventilateur
        digitalWrite(FAN_PIN, LOW);
        fanOn = true;
      } else {
        // Éteindre le ventilateur
        digitalWrite(FAN_PIN, HIGH);
        fanOn = false;
      }

      // Contrôle de l'humidificateur (relays ON -> true = Nc)
      if (humidityStatus == "ON" ) {
        // Allumer l'humidificateur
        digitalWrite(HUMIDIFIER_PIN, LOW);
        humidifierOn = true;
      } else {
        // Éteindre l'humidificateur
        digitalWrite(HUMIDIFIER_PIN, HIGH);
        humidifierOn = false;
      }
    }
  } else {
    Serial.print("Erreur lors de la requête HTTP GET : ");
    Serial.println(httpResponseCode);
    Serial.println("no server response is received");

    if (avgTemperature < 36 and numFailedSensors < 4 ) {
      // Allumer le ventilateur si la température moyenne est dans la plage souhaitée
      digitalWrite(FAN_PIN, LOW);
      fanOn = true;
    } else {
      // Éteindre le ventilateur
      digitalWrite(FAN_PIN, HIGH);
      fanOn = false;
    }

    if (avgHumidity < 45 and numFailedSensors < 4 ) {
      // Allumer l'humidificateur si l'humidité moyenne est dans la plage souhaitée
      digitalWrite(HUMIDIFIER_PIN, LOW);
      humidifierOn = true;
    } else {
      // Éteindre l'humidificateur
      digitalWrite(HUMIDIFIER_PIN, HIGH);
      humidifierOn = false;
    }
  }

  // Libérer les ressources
  http.end();



  // Print sensor values and status
  Serial.print("Sensor 1 - Humidity: ");
  Serial.print(humidity_1);
  Serial.print(" %, Temperature: ");
  Serial.print(temperature_1);
  Serial.println(" °C");
  Serial.print("Sensor 2 - Humidity: ");
  Serial.print(humidity_2);
  Serial.print(" %, Temperature: ");
  Serial.print(temperature_2);
  Serial.println(" °C");
  Serial.print("Sensor 3 - Humidity: ");
  Serial.print(humidity_3);
  Serial.print(" %, Temperature: ");
  Serial.print(temperature_3);
  Serial.println(" °C");
  Serial.print("Sensor 4 - Humidity: ");
  Serial.print(humidity_4);
  Serial.print(" %, Temperature: ");
  Serial.print(temperature_4);
  Serial.println(" °C");
  Serial.print("Average Temperature: ");
  Serial.print(avgTemperature);
  Serial.println(" °C");
  Serial.print("Average Humidity: ");
  Serial.print(avgHumidity);
  Serial.println(" %");
  Serial.print("Fan Status: ");
  Serial.println(fanOn ? "ON" : "OFF");
  Serial.print("Humidifier Status: ");
  Serial.println(humidifierOn ? "ON" : "OFF");
  Serial.print("Failed Sensors : ");
  Serial.println(numFailedSensors);

  int buttonState = digitalRead(buttonPin);  // Lire l'état du bouton
    // Si le bouton est appuyé, faire tourner le moteur
  if (buttonState == LOW) {
      stepper.moveTo(200);
      stepper.setSpeed(100);
      stepper.runToPosition(); // Déplacer le moteur de 200 pas
  }
  

  // Wait for the stepper motor to complete its movement
  while (stepper.isRunning() ) {
    stepper.run();
  }

  numFailedSensors = 0;

  // Wait for a certain period before sending the next request
  delay(30000);
}