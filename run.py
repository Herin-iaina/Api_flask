# -*- coding: utf-8 -*-
from flask import Flask, render_template, jsonify, request
import json
from apps import post_temp_humidity
import datetime 



app = Flask(__name__)

# Une liste de dictionnaires de clés API autorisées
api_keys = [
    {'key': 'votre_cle_api_1'},
    {'key': 'votre_cle_api_2'},
    {'key': 'Votre_Cle_API'},
    
]

@app.route("/")
def hello():
    return "hello"

@app.route("/values" , methods=['POST'])
def data__():
    data = request.json
     # Vérifier si la clé API est valide

    humidity = 0
    temperature = 0
    average_temperature = 0
    average_humidity = 0
    num_failed_sensors = 0
    sensor_name = ""
    fan_status = ""
    humidifier_status = ""
    date_serveur = datetime.datetime.now()  

    result = False


    api_key = request.headers.get('X-API-KEY')
    print(api_key)


    if not api_key:
        return jsonify({'message': 'API key missing'}), 401  # Unauthorized


    if not any(api['key'] == api_key for api in api_keys):
        return jsonify({'message': 'Clé API non valide'}), 401  # Non autorisé
    
    try : 
        # Retrieve other values
        average_temperature = float(data['average_temperature'])
        average_humidity = float(data['average_humidity'])
        fan_status = data['fan_status']
        humidifier_status = data['humidifier_status']
        num_failed_sensors = int(data['numFailedSensors'])
        
    except Exception : 
            return jsonify({'message': 'Missing data'}), 400  # Mauvaise requête
    
    # Vérifier si les données de température et d'humidité sont présentes
    for sensor_name, sensor_data in data.items():
    # Check if it's a sensor data
        if sensor_name.startswith('sensor'):
            # Retrieve humidity and temperature values
            # Vérifier si les données de température et d'humidité sont présentes
            try : 
                humidity = float(sensor_data['humidity'])
                temperature = float(sensor_data['temperature'])
            except Exception : 
                return jsonify({'message': 'Missing data'}), 406  # Mauvaise requête
            
            data_to_insert = {
            'sensor': sensor_name,
            'temperature': temperature,
            'humidity': humidity,
            'average_humidity': average_humidity,
            'average_temperature': average_temperature,
            'fan_status': fan_status,
            'humidifier_status': humidifier_status,
            'numfailedsensors': num_failed_sensors,
            'date_serveur': date_serveur
            }
            # Ajouter les données dans la base
            result = post_temp_humidity.add_data(data_to_insert)     
    
    
    if result == True : 
        return jsonify({'message': 'Data received successfully'}), 200  # Succès
    else :
        return jsonify({'message': 'Internal Server Error'}),500 # Erreur


if __name__ == "__main__":
    app.run("0.0.0.0",debug=True)


