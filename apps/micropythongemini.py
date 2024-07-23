import network
import ujson
import math
from machine import Pin, PWM
import urequests
from stepper import Stepper


# Pin Definitions (adjust based on your board)
DHT_1_PIN_DATA = 0
DHT_2_PIN_DATA = 2
DHT_3_PIN_DATA = 4
DHT_4_PIN_DATA = 5
STEPPER_PIN_1 = 12
STEPPER_PIN_2 = 13
FAN_PIN = 14
HUMIDIFIER_PIN = 15
Pushbutton = 23

# Function definitions for WiFi, JSON, stepper motor, and DHT sensor
# Replace with equivalent MicroPython code or libraries

    # Initialize DHT sensors
dht1 = dht.DHT22(Pin(DHT_1_PIN_DATA))
dht2 = dht.DHT22(Pin(DHT_2_PIN_DATA))
dht3 = dht.DHT22(Pin(DHT_3_PIN_DATA))
dht4 = dht.DHT22(Pin(DHT_4_PIN_DATA))

numFailedSensors = 0
avgFailedSensors = 0
avgTemperature = 0
avgHumidity = 0 

# humidity_1 = 0
# temperature_1 = 0
# humidity_2 = 0
# temperature_2 = 0
# humidity_3 = 0
# temperature_3 = 0
# humidity_4 = 0
# temperature_4 = 0

def connect_wifi(ssid, password):
    # Replace with your WiFi connection logic
    station = network.WLAN(network.STA_IF)
    station.active(True)
    station.connect(ssid, password)
    while station.isconnected() == False:
        pass
    print('Connection successful')
    print(station.ifconfig())

def read_dht_sensor(sensor):
    try:
        sensor.measure()
        temperature = sensor.temperature()
        humidity = sensor.humidity()
        return temperature, humidity
    except OSError as e:
        print(f"DHT sensor error: {e}")
        return None, None

def process_sensor_data(humidity_1, temperature_1, humidity_2, temperature_2, humidity_3, temperature_3, humidity_4, temperature_4):
    numFailedSensors = 0
    
    if math.isnan(humidity_1) or math.isnan(temperature_1):
        humidity_1 = 0
        numFailedSensors += 1
    if math.isnan(humidity_2) or math.isnan(temperature_2):
        humidity_2 = 0
        numFailedSensors += 1
    if math.isnan(humidity_3) or math.isnan(temperature_3):
        humidity_3 = 0
        numFailedSensors += 1
    if math.isnan(humidity_4) or math.isnan(temperature_4):
        humidity_4 = 0
        numFailedSensors += 1

    return numFailedSensors

def calculate_averages(numFailedSensors, temperature_1, temperature_2, temperature_3, temperature_4, humidity_1, humidity_2, humidity_3, humidity_4):
    if numFailedSensors == 0:
        avgTemperature = (temperature_1 + temperature_2 + temperature_3 + temperature_4) / 4
        avgHumidity = (humidity_1 + humidity_2 + humidity_3 + humidity_4) / 4
    elif numFailedSensors == 1:
        avgTemperature = (temperature_1 + temperature_2 + temperature_3 + temperature_4) / 3
        avgHumidity = (humidity_1 + humidity_2 + humidity_3 + humidity_4) / 3
    elif numFailedSensors == 2:
        avgTemperature = (temperature_1 + temperature_2 + temperature_3 + temperature_4) / 2
        avgHumidity = (humidity_1 + humidity_2 + humidity_3 + humidity_4) / 2
    elif numFailedSensors == 3:
        avgTemperature = temperature_1 + temperature_2 + temperature_3 + temperature_4
        avgHumidity = humidity_1 + humidity_2 + humidity_3 + humidity_4
    else:  # numFailedSensors == 4
        avgTemperature = 0
        avgHumidity = 0

    return avgTemperature, avgHumidity


def create_json_payload(humidity_1, temperature_1, humidity_2, temperature_2, humidity_3, temperature_3, humidity_4, temperature_4, avgTemperature, avgHumidity, fanOn, humidifierOn, numFailedSensors):
    payload = {}
    payload["sensor_1"] = {"humidity": humidity_1, "temperature": temperature_1}
    payload["sensor_2"] = {"humidity": humidity_2, "temperature": temperature_2}
    payload["sensor_3"] = {"humidity": humidity_3, "temperature": temperature_3}
    payload["sensor_4"] = {"humidity": humidity_4, "temperature": temperature_4}
    payload["average_temperature"] = avgTemperature
    payload["average_humidity"] = avgHumidity
    payload["fan_status"] = "ON" if fanOn else "OFF"
    payload["humidifier_status"] = "ON" if humidifierOn else "OFF"
    payload["numFailedSensors"] = numFailedSensors
    
    return ujson.dumps(payload)


def send_data(serverIP, serverPort, apiKey, jsonPayload):
    """Envoie des données JSON à un serveur via une requête POST.

    Args:
        serverIP (str): Adresse IP du serveur.
        serverPort (int): Port du serveur.
        apiKey (str): Clé API pour l'authentification.
        jsonPayload (dict): Charge utile JSON à envoyer.
    """

    # Initialiser l'objet HTTPClient
    http = urequests.request()

    # Construire l'URL de la requête
    url = "http://" + str(serverIP) + ":" + str(serverPort) + "/data"

    # Définir les en-têtes HTTP
    headers = {
        "Content-Type": "application/json",
        "x-api-key": apiKey
    }

    # Convertir la charge utile JSON en chaîne
    data =  jsonPayload  # ujson.dumps(jsonPayload)

    # Envoyer la requête POST
    response = http.post(url, headers=headers, data=data)

    # Vérifier le code de réponse HTTP
    if response.status_code > 0:
        print("Code de réponse HTTP :", response.status_code)

        # Lire la réponse du serveur
        response_text = response.text
        print("Réponse du serveur :")
        print(response_text)
    else:
        print("Erreur lors de la requête HTTP :", response.status_code)

    # Libérer les ressources
    response.close()

# # Exemple d'utilisation
# serverIP = "192.168.1.10"
# serverPort = 8080
# apiKey = "ma_super_cle_api"
# jsonPayload = {"data1": 123, "data2": "Bonjour!"}

# send_data(serverIP, serverPort, apiKey, jsonPayload)



def control_stepper(motor_status):
    if motor_status == "ON":
        # Déplacer le moteur pas à pas
        s1 = Stepper(STEPPER_PIN_1,STEPPER_PIN_2,steps_per_rev=200)
        # endswitch = machine.Pin(Pushbutton, machine.Pin.IN, machine.Pin.PULL_UP)
        s1.speed(100)
        s1.target(0)
    else:
        # Arrêter le moteur pas à pas
        s1.stop()
        s1.target(0)

def control_fan(speed):
    # Assuming FAN_PIN is connected to a PWM pin
    fan_pwm = PWM(Pin(FAN_PIN))
    fan_pwm.duty_u16(int(speed * 65535 / 100))

def control_humidifier(state):
    humidifier_pin = Pin(HUMIDIFIER_PIN, Pin.OUT)
    humidifier_pin.value(state)

# Example usage
connect_wifi("your_ssid", "your_password")

while True:
    try:
        humidity_1, temperature_1 = read_dht_sensor(dht1)
        humidity_2, temperature_2 = read_dht_sensor(dht2)
        humidity_3, temperature_3 = read_dht_sensor(dht3)
        humidity_4, temperature_4 = read_dht_sensor(dht4)
        
        numFailedSensors = process_sensor_data(humidity_1, temperature_1, humidity_2, temperature_2, humidity_3, temperature_3, humidity_4, temperature_4)
        
        print(f"Number of failed sensors: {numFailedSensors}")
        avgTemperature, avgHumidity = calculate_averages(numFailedSensors, temperature_1, temperature_2, temperature_3, temperature_4, humidity_1, humidity_2, humidity_3, humidity_4)
        
    except Exception as e:
        print(f"Error reading DHT sensors: {e}")
# Check for invalid sensor values

sleep(2)  # Delay for 2 seconds
