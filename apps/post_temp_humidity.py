# -*- coding: utf-8 -*-
import psycopg2
from apps.config_database import *
import datetime


# Obtenir la connexion à la base de données
# conn = get_db_connection()

def add_data(data_to_insert) :

    conn = get_db_connection()
    # Requête SQL pour l'insertion des données sans spécifier l'identifiant (id)
    sql_insert_query = """
        INSERT INTO data_temp (sensor, temperature, humidity, date_serveur, average_temperature, 
        average_humidity, fan_status, humidifier_status, numfailedsensors)
        VALUES (%(sensor)s, %(temperature)s, %(humidity)s, %(date_serveur)s, 
        %(average_temperature)s, %(average_humidity)s, %(fan_status)s, %(humidifier_status)s, %(numfailedsensors)s )
    """

    # data_to_insert = {
    #     'sensor': 'sensor_name',
    #     'temperature': 25.5,
    #     'humidity': 50.32,
    #     'date_serveur': '2023-11-16 12:31:00'  # Remplacez par la date appropriée
    # }
  
    
    try:
        # Créer un curseur pour exécuter la requête SQL
        with conn.cursor() as cursor:
            # Exécuter la requête SQL avec les données à insérer
            cursor.execute(sql_insert_query, data_to_insert)

        # Valider les modifications dans la base de données
        conn.commit()
        print("Données insérées avec succès dans la table data_temp.")
        return True
    except psycopg2.Error as e:
        print("Erreur lors de l'insertion des données:", e)
        return False
    # finally:
    #     # Fermer la connexion à la base de données
    #     conn.close()


def post_stepper_status():

    stepper = "OFF"

    date_now = datetime.datetime.now()
    # Convert the time difference to a formatted string
    formatted_date = date_now.strftime("%H:%M")
    # Convert formatted_date to datetime object
    formatted_datetime = datetime.datetime.strptime(formatted_date, "%H:%M").time()
    formatted_datetime = datetime.datetime.combine(datetime.datetime.min, formatted_datetime)

    # Convert formatted_date to datetime object
    date_on = datetime.datetime.strptime("06:00", "%H:%M").time()
    date_on = datetime.datetime.combine(datetime.datetime.min, date_on)
    
    # Calculate the time difference
    diff_time = formatted_datetime - date_on
    if diff_time == datetime.timedelta(hours=0) :
        stepper = "ON"
    
    return stepper

def get_last_data():

    conn = get_db_connection()
    average_temperature = 0
    average_humidity = 0
    fan_humidity_status = ["OFF", "OFF"]


    sql_select_data = """
    SELECT id, average_temperature, average_humidity 
    FROM data_temp ORDER BY id DESC LIMIT 1
    """
    try : 
        # Créer un curseur pour exécuter la requête SQL
        cursor = conn.cursor()
        cursor.execute(sql_select_data)
        # Récupération des résultats
        # Récupération du premier résultat (le dernier enregistrement)
        resultat = cursor.fetchone()

        if resultat:
            average_temperature = resultat[1]
            average_humidity = resultat[2]

        if average_temperature >= 37.7 : 
            fan_humidity_status[0] = "OFF"
        else:
            fan_humidity_status[0] = "ON"
        
        if average_humidity >= 45 :
            fan_humidity_status[1] = "OFF"
        else :
            fan_humidity_status[1] = "ON"

        cursor.close()
        conn.close()

    except Exception as e:
        print("Erreur lors de la récupération des données:", e)

 
    return fan_humidity_status


def get_all_data(date_ini, date_end):

    conn = get_db_connection()
    resultats = []
    select_all_data = """
    SELECT * 
    FROM data_temp
    """

    if date_ini or date_end : 
        select_all_data = """
        SELECT * 
        FROM data_mp
        WHERE date_trunc('minute', date_serveur) BETWEEN %(date_ini)s AND %(date_end)s """

    
    conn = get_db_connection()
    try :
        cursor = conn.cursor()
        if date_ini and date_end :
            cursor.execute(select_all_data,{'date_ini' : date_ini ,'date_end' : date_end})
         # Récupération des résultats 
            resultats = cursor.fetchall()
        
        else :
            cursor.execute(select_all_data)
         # Récupération des résultats 
            resultats = cursor.fetchall()

    except Exception as e :
        print("Erreur lors de la récupération des données:", e)

    return resultats