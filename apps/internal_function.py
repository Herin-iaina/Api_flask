# -*- coding: utf-8 -*-
from flask import Flask, render_template, jsonify, request
import json
from apps import post_temp_humidity
import datetime 
from apps import config_database






def get_data():
   
    fan_humidity_status = post_temp_humidity.get_last_data()
    fan_status = fan_humidity_status[0]  # Utiliser l'indice 0 pour la première valeur
    humidifier_status = fan_humidity_status[1]  # Utiliser l'indice 1 pour la deuxième valeur
    motor_status = post_temp_humidity.post_stepper_status()

    data_to_send = {
        'FAN': fan_status,
        'Humidity': humidifier_status,
        'Motor': motor_status
    }
    return jsonify(data_to_send)


def get_all_data(date_int, date_end) : 

    if date_int or date_end: 
        # return jsonify({'message': 'Missing parameters'}), 400  # Bad Request
        results = post_temp_humidity.get_all_data(False,False)
        return jsonify(results)
    else:
        
        try : 
            date_int = datetime.datetime.strptime(date_int, "%Y-%m-%d %H:%M")
            date_end = datetime.datetime.strptime(date_end, "%Y-%m-%d %H:%M")
            print(date_int,date_end)
            # return jsonify(date_end), 202
            results = post_temp_humidity.get_all_data(date_int,date_end)
            return jsonify(results)
        
        except Exception :
            return jsonify("Internal serveur error")



