import datetime



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


# cursor.execute(select_parameter)
# id_result = cursor.fetchone()

# cursor.execute(select_stepper)
# id_stepper = cursor.fetchone()