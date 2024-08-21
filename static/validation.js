function dateformat(datestr) {
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

  return dateObj.toLocaleString('fr-FR', options);
}

function checkIfisRunning(date_debut_) {
  return fetch('/isrunning', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'votre_cle_api_1'
    },
    body: JSON.stringify({ date: date_debut_ })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(response);
    return response.json();
  })
  .then(data => {
    console.log(data);
    return data;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    return false;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const ParamForm = document.getElementById('ParamForm');
  const selectElement = document.getElementById('data-select');
  const temperature = document.getElementById('temperature');
  const humidite = document.getElementById('humidite');
  const date_debut = document.getElementById('date-debut');
  const retournement = document.getElementById('retournement');
  const message_ = document.getElementById('Message');
  const jrs_eclo = document.getElementById('dayclose')

  function updateConsoleLog() {
    const selectElement_v = selectElement.value;
    const temperature_v = temperature.value;
    const humidite_v = humidite.value;
    const date_debut_v = date_debut.value;
    const retournement_v = retournement.value;
    const jrs_eclo_v = jrs_eclo.value

    return { date_debut_v, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v };
  }

  function postdata(date_debut_v, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v) {
    // const formattedDate = dateformat(date_debut_v)
    fetch('/parameter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-API-KEY": "votre_cle_api_1"
      },
      body: JSON.stringify({ 
        start_date: date_debut_v, 
        espece: selectElement_v, 
        temperature: temperature_v, 
        humidity: humidite_v, 
        number_stepper: retournement_v,
        stat_stepper: true,
        timetoclose : jrs_eclo_v
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      message_.textContent = "Mise à jour réussie";
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      message_.textContent = "Erreur lors de la mise à jour";
    });
  }

  function forceupdate(formattedDate, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v){
    // Créer le popup
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // Ajouter le style pour centrer le popup
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = "#090808" ;//'white';
    popup.style.borderRadius = '10px';
    popup.style.color = '#c73b3b';
    popup.style.padding = '10px';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '9999';

    const popupMessage = document.createElement('p');
    popupMessage.textContent = "Un processus est déjà en cours. \n Voulez-vous continuer la mofification ?";

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.justifyContent = 'center';
    buttonsContainer.style.marginTop = '20px';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = "Annuler";
    cancelButton.style.backgroundColor = '#f44336';
    cancelButton.style.color = 'white';
    cancelButton.style.border = 'none';
    cancelButton.style.padding = '10px 20px';
    cancelButton.style.borderRadius = '5px';
    cancelButton.style.marginRight = '5px';
    cancelButton.addEventListener('click', () => {
      popup.remove(); // Fermer le popup
      message_.textContent = "Modification annuler"
    });

    const confirmButton = document.createElement('button');
    confirmButton.textContent = "Oui";
    confirmButton.style.backgroundColor = '#4CAF50';
    confirmButton.style.color = 'white';
    confirmButton.style.border = 'none';
    confirmButton.style.padding = '10px 20px';
    confirmButton.style.borderRadius = '5px';
    confirmButton.style.marginLeft = '5px';
    confirmButton.addEventListener('click', () => {
      popup.remove(); // Fermer le popup
      postdata(formattedDate, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v);
    });

    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(confirmButton);

    popup.appendChild(popupMessage);
    popup.appendChild(buttonsContainer);

    document.body.appendChild(popup);
  }

  // Ajouter des écouteurs d'événements pour chaque champ
  selectElement.addEventListener('change', updateConsoleLog);
  temperature.addEventListener('input', updateConsoleLog);
  humidite.addEventListener('input', updateConsoleLog);
  date_debut.addEventListener('input', updateConsoleLog);
  retournement.addEventListener('input', updateConsoleLog);

  ParamForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const { date_debut_v, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v } = updateConsoleLog();
    
    if (date_debut_v) {
      const formattedDate = dateformat(date_debut_v);
      // console.log(checkIfisRunning(formattedDate));
      let isok = checkIfisRunning(formattedDate)
      .then(isRunning => {
        // console.log(isRunning)
        if (isRunning) {
          postdata(formattedDate, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v);
        } else {
          // message_.textContent = "Un processus est en cours";
          forceupdate(formattedDate, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v)
        }
      });
    }
  });
});
