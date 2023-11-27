# -*- coding: utf-8 -*-
from flask import Flask, render_template, jsonify, request
import json
from apps import post_temp_humidity
import datetime 
from apps import config_database



app = Flask(__name__)

# Une liste de dictionnaires de clés API autorisées
api_keys = [
    {'key': 'votre_cle_api_1'},
    {'key': 'votre_cle_api_2'}
]

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
            return jsonify({'message': 'Données manquantes'}), 400  # Mauvaise requête
    
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
                return jsonify({'message': 'Données manquantes'}), 406  # Mauvaise requête
            
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
        config_database.close_db_connection()
        return jsonify({'message': 'Données reçues avec succès'}), 200  # Succès
    else :
        return jsonify({'message': 'Internal Server Error'}),500 # Erreur


@app.route("/getdata", methods=['GET'])
def get_data():
    api_key = request.headers.get('X-API-KEY')
    print(api_key)
    if not api_key:
        return jsonify({'message': 'API key missing'}), 401  # Unauthorized

    fan_humidity_status = post_temp_humidity.get_last_data()
    fan_status = fan_humidity_status[0]  # Utiliser l'indice 0 pour la première valeur
    humidifier_status = fan_humidity_status[1]  # Utiliser l'indice 1 pour la deuxième valeur
    motor_status = post_temp_humidity.post_stepper_status()

    data_to_send = {
        'FAN': fan_status,
        'Humidity': humidifier_status,
        'Motor': motor_status
    }
    return jsonify(data_to_send), 202


@app.route("/alldata", methods=['GET'])
def get_all_data() : 

    api_key = request.headers.get('X-API-KEY')
    if not api_key:
        return jsonify({'message': 'API key missing'}), 401  # Unauthorized

    if 'date_int' not in request.args or 'date_end' not in request.args:
        # return jsonify({'message': 'Missing parameters'}), 400  # Bad Request
        results = post_temp_humidity.get_all_data(False,False)
        return jsonify(results), 202
    else:  
        date_int = request.args['date_int']
        date_end = request.args['date_end']
        
        try : 
            date_int = datetime.datetime.strptime(date_int, "%Y-%m-%d %H:%M")
            date_end = datetime.datetime.strptime(date_end, "%Y-%m-%d %H:%M")
            print(date_int,date_end)
            # return jsonify(date_end), 202
            results = post_temp_humidity.get_all_data(date_int,date_end)
            return jsonify(results), 202
        
        except Exception :
            return jsonify("Internal serveur error"), 500



if __name__ == "__main__":
    app.run(debug=True)


