# import datetime



# date_now = datetime.datetime.now()
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


import requests

url = "http://127.0.0.1:5000/alldata?date_int=2023-11-22 12:30&date_end=2023-11-22 12:50"

payload = {}
headers = {
  'X-API-KEY': 'votre_cle_api_1'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
