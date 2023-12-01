# -*- coding: utf-8 -*-
import psycopg2
from apps.config_database import *
import datetime
import threading


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
    number_stepper = 2
    start_date = ""
    date_now = datetime.datetime.today()
    delai = 60 * 60

    select_parameter = """
    SELECT   stat_stepper,number_stepper
    FROM parameter_data ORDER BY id DESC LIMIT 1
    """

    def default_() :
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
    
    def stepper_on():
        stepper = "ON"

    try :
        # Créer un curseur pour exécuter la requête SQL
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(select_parameter)
        # Récupération des résultats
        # Récupération du premier résultat (le dernier enregistrement)
        resultat = cursor.fetchone()
        if resultat :
            stepper = resultat[0]
            number_stepper = resultat[1]
            start_date = resultat[2]

        if start_date :
            start_date = datetime.datetime.strptime(start_date, "%Y-%m-%d")
            date_diff = date_now - start_date
            if date_diff >= datetime.timedelta(days=20):
                stepper = "OFF"
            else : 
                if  stepper == "ON" :
                    delai = delai * number_stepper
                    if  number_stepper > 0 :
                        thread = threading.Timer(delai, stepper_on)
                        thread.start() # Lancer le thread
    except Exception as e:
        print("Erreur lors de la récupération des données:", e)
        stepper = "OFF"

    return stepper

def get_last_data():

    average_temperature = 0
    average_humidity = 0
    fan_humidity_status = ["OFF", "OFF"]
    set_temp = 37.3
    set_humid = 45
    start_date = ""
    date_now = datetime.datetime.today()
    date_diff = ""


    sql_select_data = """
    SELECT id, average_temperature, average_humidity 
    FROM data_temp ORDER BY id DESC LIMIT 1
    """
    select_parameter = """
    SELECT temperatur, humidity, start_date
    FROM parameter_data ORDER BY id DESC LIMIT 1
    """
    try : 
        # Créer un curseur pour exécuter la requête SQL
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(sql_select_data)
        # Récupération des résultats
        # Récupération du premier résultat (le dernier enregistrement)
        resultat = cursor.fetchone()

        cursor.execute(select_parameter)
        resultat_param = cursor.fetchone()

        if resultat_param[0] :
            set_temp = resultat_param[0]
        
        if resultat_param[1] :
            set_humid = resultat[1] 
        
        if resultat_param[2] :
            start_date = resultat_param[2] 

        if start_date : 
            start_date = datetime.datetime.strptime(start_date, "%Y-%m-%d")
            date_diff = date_now - start_date
            if date_diff >= datetime.timedelta(days=20):
            #    set_temp = set_temp - 0.3 
               set_humid = set_humid + 10

        if resultat:
            average_temperature = resultat[1]
            average_humidity = resultat[2]

        if average_temperature >= set_temp : 
            fan_humidity_status[0] = "OFF"
        else:
            fan_humidity_status[0] = "ON"
        
        if average_humidity >= set_humid :
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
    
    try :
        conn = get_db_connection()
        cursor = conn.cursor()
        if date_ini and date_end :
            cursor.execute(select_all_data,{'date_ini' : date_ini ,'date_end' : date_end})
         # Récupération des résultats 
            resultats = cursor.fetchall()
        
        else :
            cursor.execute(select_all_data)
         # Récupération des résultats 
            resultats = cursor.fetchall()
        cursor.close()
        conn.close()

    except Exception as e :
        print("Erreur lors de la récupération des données:", e)

    return resultats


def create_parameter(data_to_insert):

    sql_insert_param = """
    INSERT INTO parameter_data (temperature, humidity, start_date,stat_stepper,number_stepper)
    VALUES (37.5, 45, %(start_date)s,'ON',2)"""


    select_parameter = """
    SELECT id
    FROM parameter_data ORDER BY id DESC LIMIT 1
    """

    sql_update_param = """
        UPDATE parameter_data 
        SET temperature = :temperature, humidity = :humidity, start_date = :start_date, 
            stat_stepper = :stat_stepper, number_stepper = :number_stepper 
        WHERE id = :id
    """
    try : 
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(select_parameter)
        id_result = cursor.fetchone()

        if id_result :
            sql_update_param['id'] = id_result[0]
            cursor.execute(sql_update_param,data_to_insert)
            conn.commit()
        else : 
            cursor.execute(select_parameter, {'start_date' : datetime.datetime.today()})
            conn.commit()

        cursor.close()
        conn.close()
        return True
    
    except Exception as e:
        print(f"Error occurred: {e}")
        return False
