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
  
    return dateObj.toLocaleDateString('fr-FR', options);
  }
  
  function checkIfisRuning(date_debut_) {
    fetch('/isruning', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date_debut_ })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const ParamForm = document.getElementById('ParamForm');
    const selectElement = document.getElementById('data-select');
    const temperature = document.getElementById('temperature');
    const humidite = document.getElementById('humidite');
    const date_debut = document.getElementById('date-debut');
    const retournement = document.getElementById('retournement');
  
    function updateConsoleLog() {
      const selectElement_v = selectElement.value;
      const temperature_v = temperature.value;
      const humidite_v = humidite.value;
      const date_debut_v = date_debut.value;
      const retournement_v = retournement.value;
    //   console.log('Option:', selectElement_v, 'Temperature:', temperature_v, 'Humidité:', humidite_v, 'Date de début:', date_debut_v, 'Retournement:', retournement_v);
      return { date_debut_v, selectElement_v, humidite_v, retournement_v, selectElement_v};
    }
  
    // Ajouter des écouteurs d'événements pour chaque champ
    selectElement.addEventListener('change', updateConsoleLog);
    temperature.addEventListener('input', updateConsoleLog);
    humidite.addEventListener('input', updateConsoleLog);
    date_debut.addEventListener('input', updateConsoleLog);
    retournement.addEventListener('input', updateConsoleLog);
  
    // Appeler updateConsoleLog une fois au chargement de la page
    updateConsoleLog();
  
    ParamForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const { date_debut_v } = updateConsoleLog();
      if (date_debut_v) {
        const formattedDate = dateformat(date_debut_v);
        console.log(formattedDate);
        checkIfisRuning(formattedDate);
      }
    });
  });
  
