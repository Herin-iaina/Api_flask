import datetime
import requests


date_now = datetime.datetime.today() # datetime.datetime.now()
# date_diff = date_now - datetime.timedelta(hours=24)


# # print(date_diff, date_now )



# # Formater la date
# # formatted_date = date_diff.strftime("%Y-%m-%d %H:%M")
# # Get the current date and time
# date_now = datetime.datetime.now()

# # Convert the time difference to a formatted string
# formatted_date = date_diff.strftime("%H:%M")
# # Convert formatted_date to datetime object
# formatted_datetime = datetime.datetime.strptime(formatted_date, "%H:%M").time()
# formatted_datetime = datetime.datetime.combine(datetime.datetime.min, formatted_datetime)
# print(formatted_datetime)

# # Parse the date and time string into a datetime object
# date_on = datetime.datetime.strptime("12:58", "%H:%M").time()
# date_on = datetime.datetime.combine(datetime.datetime.min, date_on)
# print(date_on)

# diff_time = formatted_datetime - date_on
# print (datetime.timedelta(hours=0))
# print(diff_time)



# Formater la date
# formatted_date = date_diff.strftime("%Y-%m-%d")
# print(formatted_date)

# date_cal = date_now - date_diff

# print("test : ", date_cal)
# if date_now - date_diff == datetime.timedelta(days=1) :
#     print("ok")



# date_diff = date_diff.strptime( f"{formatted_date} 12:00:00", "%Y-%m-%d %H:%M:%S")

# date_diff = date_diff.strptime( f"{formatted_date} 12:00", "%Y-%m-%d %H:%M")
# print(date_diff, "ggggg")

# formatted_date = date_diff.strftime("%H:%M")
# print(formatted_date)


# import requests

# # URL de l'endpoint où vous souhaitez envoyer les données
# url = 'https://votre_serveur/votre_endpoint'

# # Clé d'API
# api_key = 'votre_cle_api'

# # Données à envoyer sous forme de dictionnaire
# data = {
#     "sensor_1": {"humidity": 0, "temperature": 0},
#     "sensor_2": {"humidity": 0, "temperature": 0},
#     "sensor_3": {"humidity": 0, "temperature": 0},
#     "sensor_4": {"humidity": None, "temperature": 0},
#     "average_temperature": 0,
#     "average_humidity": 0,
#     "fan_status": "OFF",
#     "humidifier_status": "OFF",
#     "numFailedSensors": 4
# }

# # Paramètres de la requête (clé d'API)
# headers = {
#     'X-API-KEY': api_key,
#     'Content-Type': 'application/json'  # Type de contenu JSON
# }

# # Envoi de la requête POST
# response = requests.post(url, json=data, headers=headers)

# # Vérifier le code de statut HTTP de la réponse
# if response.status_code == 200:
#     print('Requête POST réussie !')
# else:
#     print('Échec de la requête POST.')

url = "http://127.0.0.1:5005/alldata"

payload = {}
headers = {
  'X-API-KEY': 'votre_cle_api_1'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)


# # Définir l'heure de départ
# heure_depart = datetime.datetime.strptime('06:00:00', '%H:%M:%S').time()

# # Ajouter 2 heures
# heure_depart_dt = datetime.datetime.combine(datetime.datetime.today(), heure_depart)
# heure_arrivee = heure_depart_dt + datetime.timedelta(hours=12.15)

# # Afficher l'heure d'arrivée
# print(heure_arrivee.time(), 'ggggghhhhh')
# test = heure_arrivee.time()


# def default_(date_on = None) :
#         stepper = "OFF"
#         date_now = datetime.datetime.now()
#         # Convert the time difference to a formatted string
#         formatted_date = date_now.strftime("%H:%M")
#         print("formatted_date", formatted_date)
#         # Convert formatted_date to datetime object
#         formatted_datetime = datetime.datetime.strptime(formatted_date, "%H:%M").time()
#         formatted_datetime = datetime.datetime.combine(datetime.datetime.min, formatted_datetime)

#         print("formatted_date 1 :", formatted_date)

#         # Convert formatted_date to datetime object
#         if not date_on :
#             date_on = datetime.datetime.strptime("06:00", "%H:%M").time()
#         else :
#              date_on = date_on.strftime("%H:%M")
#              print("date_on A", date_on)
#              date_on = datetime.datetime.strptime(date_on, "%H:%M").time()
#              print("date_on B", date_on)
#              date_on = datetime.datetime.combine(datetime.datetime.min, date_on)

#         # date_on = datetime.datetime.combine(datetime.datetime.min, date_on)

#         print("date_on", date_on)
        
#         # Calculate the time difference
#         diff_time = formatted_datetime - date_on
#         print(diff_time,"ggggg", datetime.timedelta(hours=0, minutes= 2), datetime.timedelta(hours=0))
#         if diff_time >= datetime.timedelta(hours=0) and diff_time <= datetime.timedelta(hours=0, minutes= 2) :
#             stepper = "ON"
#         return stepper


# test_timedelta = datetime.timedelta(hours=date_now.hour, minutes=date_now.minute, seconds=date_now.second)

# print(test_timedelta,"xxxxxx", datetime.timedelta(hours=6), datetime.timedelta(hours=12), datetime.timedelta(hours=18), datetime.timedelta(hours=0))

# if  test_timedelta > datetime.timedelta(hours=6) :
#      print("ggggggg")
# else : 
#      print("rrrrrrrrrrrrr")


Database = """CREATE TABLE data_temp (
    id SERIAL PRIMARY KEY,
    sensor TEXT,
    temperature NUMERIC,
    humidity NUMERIC,
    date_serveur TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    average_temperature NUMERIC,
    average_humidity NUMERIC,
    fan_status BOOLEAN,
    humidifier_status BOOLEAN,
    numfailedsensors INTEGER
);"""
   
# Contraintes: Vous pouvez ajouter des contraintes pour garantir l'intégrité des données. Par exemple, pour s'assurer que la température est positive :
SQL = """CREATE TABLE your_table_name (
    -- ...
    temperature NUMERIC CHECK (temperature >= 0),
    -- ...
);"""

# faire de nombreuses requêtes sur des colonnes spécifiques
"""CREATE INDEX idx_date_serveur ON your_table_name (date_serveur);
"""


sql_data_table = """
SELECT
    date_trunc('minute', date_serveur) as heure,
    AVG(temperature) as temperature_moyenne,
    AVG(humidity) as humidite_moyenne, 
	AVG(average_temperature) as temps,
	AVG(average_humidity) as humid,
	AVG(numfailedsensors) as failed,
	sensor
FROM
    data_temp
WHERE
    date_serveur >= '2024-07-28'  -- Troncature à la seconde supprimée
GROUP BY
    heure,
	sensor
ORDER BY
    heure;
    """
