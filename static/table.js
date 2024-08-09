
function dateformat (datestr) {
    const dateObj = new Date(datestr);

    // Options pour le format de date
    const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
    };

    const formattedDate = dateObj.toLocaleDateString('fr-FR', options);
    // console.log(datestr)
    // console.log(formattedDate); // Affiche : "29/07/2024 08:48"
    return formattedDate
}


function afficherDonnees(data) {
    const tableBody = document.getElementById('myTable');
    tableBody.innerHTML = '';
    
    // console.log(data)
    if (Array.isArray(data)) {
      data.forEach(row => {
        const newRow = document.createElement('tr');
        console.log(row.capteur)
  
        // Assuming data structure: { capteur, date, temperature, humidite, ... }
        const capteurCell = document.createElement('td');
        capteurCell.textContent = row.Sensor;
        capteurCell.classList.add('bg-success');
        newRow.appendChild(capteurCell);
  
        const dateCell = document.createElement('td');
        // Appel de la fonction dateformat pour formater la date
        dateCell.textContent = dateformat(row.date);
        // Ajout de la classe CSS "bg-success"
        dateCell.classList.add('bg-success');
        newRow.appendChild(dateCell);
  
        const TemperatureCell = document.createElement('td');
        TemperatureCell.textContent = row.temperature;
        TemperatureCell.classList.add('bg-success');
        newRow.appendChild(TemperatureCell);

        const HumiditeCell = document.createElement('td');
        HumiditeCell.textContent = row.humidity;
        HumiditeCell.classList.add('bg-success');
        newRow.appendChild(HumiditeCell);

        const TemperatureMoyenne = document.createElement('td');
        TemperatureMoyenne.textContent = row.temperature_moyenne;
        TemperatureMoyenne.classList.add('bg-success');
        newRow.appendChild(TemperatureMoyenne);

        const HumiditeMoyenne = document.createElement('td');
        HumiditeMoyenne.textContent = row.humidite_moyenne;
        HumiditeMoyenne.classList.add('bg-success');
        newRow.appendChild(HumiditeMoyenne);

        const Capteurfailed = document.createElement('td');
        Capteurfailed.textContent = row.failed;
        Capteurfailed.classList.add('bg-success');
        newRow.appendChild(Capteurfailed);
  
        tableBody.appendChild(newRow);
      });
    } else {
      console.error("Données invalides : attendu un tableau");
    }
  }
  
  
 
  

// Fonction pour faire la requête GET à l'API
function envoyerDatesAuServeur(datein, dateout) {
    // Récupération des valeurs des champs date
    var date_int = datein;
    var date_end = dateout;
    // console.log('Date:', date_int);
    // console.log('Time:', date_end);

    // Construction de l'URL complète avec les valeurs dynamiques
    var url = "/alldata?date_int=" + date_int + "&date_end=" + date_end;

    var settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "X-API-KEY": "votre_cle_api_1"
        },
    };

    return new Promise((resolve, reject) => {
        $.ajax(settings)
            .done(function (response) {
                resolve(response);
            })
            .fail(function (error) {
                reject(error);
            });
    });
}

function createTable(datein, dateout) {
    envoyerDatesAuServeur(datein, dateout)
        .then(data => {
            afficherDonnees(data);
            // console.log(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
}

document.getElementById('submitButton').addEventListener('click', function () {
    const dateInValue = document.getElementById('datein').value;
    const dateOutValue = document.getElementById('dateout').value;

    // console.log('Date:', dateInValue);
    // console.log('Time:', dateInValue);

    createTable(dateInValue, dateOutValue);
});

function getDateHeureActuelle() {
    const today = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const now = today.toISOString();
    // console.log(now)

    // Obtenir le timestamp actuel en millisecondes
    const timestampAujourdHui = today.getTime();

    // Calculer le timestamp il y a 7 jours (7 jours * 24 heures * 60 minutes * 60 secondes * 1000 millisecondes)
    const timestampIlYA7Jours = timestampAujourdHui - 7 * 24 * 60 * 60 * 1000;

    // Créer un nouvel objet Date à partir du timestamp calculé
    const dateIlYA7Jours = new Date(timestampIlYA7Jours);
    const date_ini = dateIlYA7Jours.toISOString()
    // console.log(date_ini)

    createTable(date_ini, now);
}

  
getDateHeureActuelle();
 




