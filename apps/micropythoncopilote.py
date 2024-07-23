import machine
import dht
from machine import Pin
from time import sleep
import urequests

# Pin Definitions
DHT_SENSOR_TYPE = dht.DHT22
DHT_1_PIN_DATA = 0
DHT_2_PIN_DATA = 2
DHT_3_PIN_DATA = 4
DHT_4_PIN_DATA = 5
STEPPER_PIN_1 = 12
STEPPER_PIN_2 = 13
FAN_PIN = 14
HUMIDIFIER_PIN = 15

# Initialize DHT sensors
dht1 = dht.DHT22(Pin(DHT_1_PIN_DATA))
dht2 = dht.DHT22(Pin(DHT_2_PIN_DATA))
dht3 = dht.DHT22(Pin(DHT_3_PIN_DATA))
dht4 = dht.DHT22(Pin(DHT_4_PIN_DATA))

# Initialize stepper motor
stepper1 = machine.AX12(Pin(STEPPER_PIN_1), Pin(STEPPER_PIN_2))

# Initialize fan and humidifier
fan = Pin(FAN_PIN, Pin.OUT)
humidifier = Pin(HUMIDIFIER_PIN, Pin.OUT)

# Read temperature and humidity from DHT sensors
def read_dht(sensor):
    sensor.measure()
    return sensor.temperature(), sensor.humidity()



# Initialiser les paramètres
serverIP = "192.168.1.100"  # Remplacez par l'adresse IP de votre serveur
serverPort = 8080  # Remplacez par le port de votre serveur
apiKey = "votre_clé_API"  # Remplacez par votre clé API
jsonPayload = {
    "sensor_1": {
        "humidity": humidity_1,
        "temperature": temperature_1
    },
    # Ajoutez les autres capteurs et valeurs ici
    # ...
}

# Convertir la charge utile en chaîne JSON
jsonPayloadStr = ujson.dumps(jsonPayload)

# Envoyer la requête POST
try:
    response = urequests.post(f"http://{serverIP}:{serverPort}/data",
                             headers={"Content-Type": "application/json", "x-api-key": apiKey},
                             data=jsonPayloadStr)
    print("Code de réponse HTTP :", response.status_code)
    print("Réponse du serveur :", response.text)
except Exception as e:
    print("Erreur lors de la requête HTTP :", e)



def send_sensor_data(serverIP, serverPort, apiKey, sensor_data):
    try:
        # Convertir la charge utile en chaîne JSON
        jsonPayloadStr = ujson.dumps(sensor_data)

        # Envoyer la requête POST
        response = urequests.post(f"http://{serverIP}:{serverPort}/data",
                                 headers={"Content-Type": "application/json", "x-api-key": apiKey},
                                 data=jsonPayloadStr)
        print("Code de réponse HTTP :", response.status_code)
        print("Réponse du serveur :", response.text)
    except Exception as e:
        print("Erreur lors de la requête HTTP :", e)

# Exemple d'utilisation
serverIP = "192.168.1.100"  # Remplacez par l'adresse IP de votre serveur
serverPort = 8080  # Remplacez par le port de votre serveur
apiKey = "votre_clé_API"  # Remplacez par votre clé API
sensor_data = {
    "sensor_1": {
        "humidity": humidity_1,
        "temperature": temperature_1
    },
    # Ajoutez les autres capteurs et valeurs ici
    # ...
}

send_sensor_data(serverIP, serverPort, apiKey, sensor_data)


while True:
    temp1, hum1 = read_dht(dht1)
    temp2, hum2 = read_dht(dht2)
    temp3, hum3 = read_dht(dht3)
    temp4, hum4 = read_dht(dht4)

    # Your logic for controlling the stepper motor, fan, and humidifier goes here

    sleep(2)  # Delay for 2 seconds
