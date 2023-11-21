jsonPayload = request.json  # Attendu : {"sensor_1": {"humidity": 10, "temperature": 10}, "sensor_2": {"humidity": null, "temperature": null}, ...}

IPAddress serverIP(127, 0, 0, 1);
const char* endpoint = "/data"

//  Send POST request to server
  WiFiClient client;
  if (client.connect(serverIP, 5000)) {
   Serial.println("Connected to server");
   client.println("POST " + String(endpoint) + " HTTP/1.1");
   client.println("Host: " + String(serverIP));
   client.println("Content-Type: application/json");
   client.println("Content-Length: " + String(jsonPayload.length()));
   client.println();
   client.println(jsonPayload);
   client.println();
 } else {
   Serial.println("Failed to connect to server");
 }

  // Wait for server response
  delay(1000);

    // Attendre la réponse du serveur
  while (client.connected()) {
    if (client.available()) {
      String response = client.readStringUntil('\r');
      Serial.println("Réponse du serveur :");
      Serial.println(response);
    }
  }
//
///;;;;;;;;;;;;;;;;;;;;;;

    // Initialiser l'objet HTTPClient
  HTTPClient http;

  url =   String url = "http://" + String(serverIP) + ":" + String(serverPort) + "/getdata" + "?api_key=" + String(apiKey);


  // Commencer une nouvelle requête GET
  http.begin(url);

  // Envoyer la requête GET
  int httpResponseCode = http.GET();

  if (httpResponseCode > 0) {
    Serial.print("Code de réponse HTTP : ");
    Serial.println(httpResponseCode);

    // Lire la réponse du serveur
    String response = http.getString();
    Serial.println("Réponse du serveur :");
    Serial.println(response);
  } else {
    Serial.print("Erreur lors de la requête HTTP : ");
    Serial.println(httpResponseCode);
  }

  // Libérer les ressources
  http.end();

  delay(5000); // Attendre 5 secondes avant la prochaine requête
}