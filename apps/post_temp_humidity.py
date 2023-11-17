# -*- coding: utf-8 -*-
import psycopg2
from apps.config_database import get_db_connection
import datetime


# Obtenir la connexion à la base de données
conn = get_db_connection()

def add_data(data_to_insert) :

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