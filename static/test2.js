// Fonction pour créer le tableau HTML
function createTable(data) {
    // let headers = getHeaders(data) // Object.keys(data[0]);
     // Fonction pour obtenir les en-têtes du tableau
     function getHeaders(data) {
      if (!Array.isArray(data) || data.length === 0) {
        console.error('Les données ne sont pas un tableau ou sont vides');
        return [];
      }
  
      const firstItem = data[0];
  
      
      if (data[0].hasOwnProperty('espèces')) {
        // Traitement pour une structure de données inconnue
        console.error("Structure de données inconnue");
        return [];
       
      } else if (data[0].hasOwnProperty('espèce')) {
          // Traitement pour data2 (dataGoogle)
          console.log("C'est data Google");
          return googledata(data);
  
      } else if (data[0].hasOwnProperty('canne')) {
          // Traitement pour data3 (dataGPT)
          console.log("C'est dataGPT ");
          return gtpdata(data);
  
      } else {
          // Traitement pour dataClaude
          console.log("C'est dataClaude");
          return Claudedata(data);
      }
    }   
  
    function gtpdata(dataGPT) {
      const result = [];
  
      for (const [espece, details] of Object.entries(dataGPT[0])) {
        result.push({
          espece,
          duree_incubation: details.duree_incubation,
          temperature_normale: details.temperature.normale,
          temperature_max: details.temperature.maximale,
          temperature_min: details.temperature.minimale,
          humidite_normale: `${details.humidite.normale.premiere_periode}, ${details.humidite.normale.derniere_periode}`,
          humidite_max: details.humidite.maximale,
          humidite_min: details.humidite.minimale,
          tolerance_temperature: details.tolerance_ecarts.temperature,
          tolerance_humidite: details.tolerance_ecarts.humidite
        });
      }
  
      console.table(result);
      return result;
    }
  
    function googledata (dataGoogle) {
      let result = [];
  
      dataGoogle.forEach(item => {
          result.push({
            espèce: item.espèce,
            durée_incubation: item.durée_incubation,
            température_normale: item.température_normale,
            température_max: item.température_max,
            température_min: item.température_min,
            humidité_normale: item.humidité_normale,
            humidité_max: item.humidité_max,
            humidité_min: item.humidité_min,
            tolérance: item.tolérance,
            tolérance_jours: item.tolérance_jours
      });
        });
  
        console.table(result);
        return result;
      }
  
    function Claudedata (dataClaude) {
  
      const result = dataClaude[0].especes.map(espece => ({
        espèce: espece.nom,
        durée_incubation: espece.incubation.jours,
        température_normale: espece.incubation.temperature.normale,
        température_max: espece.incubation.temperature.max,
        température_min: espece.incubation.temperature.min,
        humidité_normale: espece.incubation.humidite.normale.standard,
        humidité_max: espece.incubation.humidite.max,
        humidité_min: espece.incubation.humidite.min,
        tolérance: espece.incubation.tolerance.temperature,
        tolérance_jours: espece.incubation.tolerance.jours
      }));
      
      console.table(result);
      return result;
    }
     
     const processedData = getHeaders(data);
     if (processedData.length === 0) return ''; // Vérifie si les données sont valides
     let tableHTML = '<table class="table table-bordered table-responsive-stack table-primary"><thead><tr>';
     const headers = Object.keys(processedData[0]);
     console.log(headers);
   
     headers.forEach(header => {
       tableHTML += `<th>${header}</th>`;
     });
     tableHTML += '</tr></thead><tbody>';
   
     processedData.forEach(item => {
       tableHTML += '<tr>';
       headers.forEach(header => {
         const cellContent = typeof item[header] === 'object' ? JSON.stringify(item[header]) : item[header];
         tableHTML += `<td>${cellContent}</td>`;
       });
       tableHTML += '</tr>';
     });
  
    tableHTML += '</tbody></table>';
    return tableHTML;
  }
  
  function generatetable(dataItem) {
    // Obtenir l'élément HTML où insérer le tableau
  const container = document.getElementById('table-container');
  container.innerHTML = ''
  
  if (container) {
    dataItem === 1 ? dataGoogle : test === 2 ? dataGPT : dataClaude;
  
    // Créer le tableau et l'ajouter au conteneur
    container.innerHTML = createTable(dataItem);
  } else {
    console.error('Le conteneur "table-container" n\'existe pas.');
  };
  }
  
  
  
  // Fonction pour activer le lien cliqué et désactiver les autres
  function activateLink(event) {
    // Désactive toutes les classes 'active' des liens
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
  
    // Active le lien cliqué
    event.target.classList.add('active');
  }
  
  // Fonctions spécifiques à chaque lien
  function handleNav1Click() {
    console.log('Lien 1 cliqué');
    generatetable(1)
  }
  
  function handleNav2Click() {
    console.log('Lien 2 cliqué');
    generatetable(2)
  }
  
  function handleNav3Click() {
    console.log('Lien 3 cliqué');
    generatetable(3)
  }
  
  // Ajout des écouteurs d'événements pour chaque lien
  document.getElementById('google').addEventListener('click', function(event) {
    activateLink(event);
    handleNav1Click();
  });
  
  document.getElementById('gpt').addEventListener('click', function(event) {
    activateLink(event);
    handleNav2Click();
  });
  
  document.getElementById('claude').addEventListener('click', function(event) {
    activateLink(event);
    handleNav3Click();
  });





  ParamForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const { date_debut_v, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v } = updateConsoleLog();
  
    if (date_debut_v) {
      const formattedDate = dateformat(date_debut_v);
      let isok = checkIfisRunning(formattedDate)
        .then(isRunning => {
          if (isRunning) {
            // Créer le popup
            const popup = document.createElement('div');
            popup.classList.add('popup');
  
            const popupMessage = document.createElement('p');
            popupMessage.textContent = "Un processus est en cours. Voulez-vous continuer ?";
  
            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('buttons-container');
  
            const cancelButton = document.createElement('button');
            cancelButton.textContent = "Annuler";
            cancelButton.addEventListener('click', () => {
              popup.remove(); // Fermer le popup
            });
  
            const confirmButton = document.createElement('button');
            confirmButton.textContent = "Oui";
            confirmButton.addEventListener('click', () => {
              popup.remove(); // Fermer le popup
              postdata(formattedDate, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v);
            });
  
            buttonsContainer.appendChild(cancelButton);
            buttonsContainer.appendChild(confirmButton);
  
            popup.appendChild(popupMessage);
            popup.appendChild(buttonsContainer);
  
            document.body.appendChild(popup);
          } else {
            message_.textContent = "Un processus est en cours";
          }
        });
    }
  });



  ParamForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const { date_debut_v, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v } = updateConsoleLog();
  
    if (date_debut_v) {
      const formattedDate = dateformat(date_debut_v);
      let isok = checkIfisRunning(formattedDate)
        .then(isRunning => {
          if (isRunning) {
            // Créer le popup
            const popup = document.createElement('div');
            popup.classList.add('popup');
  
            // Centrer le popup
            popup.style.position = 'fixed';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            popup.style.backgroundColor = 'white';
            popup.style.padding = '20px';
            popup.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)';
            popup.style.zIndex = '9999';
  
            const popupMessage = document.createElement('p');
            popupMessage.textContent = "Un processus est en cours. Voulez-vous continuer ?";
  
            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('buttons-container');
  
            const cancelButton = document.createElement('button');
            cancelButton.textContent = "Annuler";
            cancelButton.addEventListener('click', () => {
              popup.remove(); // Fermer le popup
            });
  
            const confirmButton = document.createElement('button');
            confirmButton.textContent = "Oui";
            confirmButton.addEventListener('click', () => {
              popup.remove(); // Fermer le popup
              postdata(formattedDate, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v);
            });
  
            buttonsContainer.appendChild(cancelButton);
            buttonsContainer.appendChild(confirmButton);
  
            popup.appendChild(popupMessage);
            popup.appendChild(buttonsContainer);
  
            document.body.appendChild(popup);
          } else {
            message_.textContent = "Un processus est en cours";
          }
        });
    }
  });



  ParamForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const { date_debut_v, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v } = updateConsoleLog();
  
    if (date_debut_v) {
      const formattedDate = dateformat(date_debut_v);
      let isok = checkIfisRunning(formattedDate)
        .then(isRunning => {
          if (isRunning) {
            // Créer le popup
            const popup = document.createElement('div');
            popup.classList.add('popup');
  
            // Ajouter le style pour centrer le popup
            popup.style.position = 'fixed';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            popup.style.backgroundColor = 'white';
            popup.style.padding = '20px';
            popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            popup.style.zIndex = '9999';
  
            const popupMessage = document.createElement('p');
            popupMessage.textContent = "Un processus est en cours. Voulez-vous continuer ?";
  
            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('buttons-container');
  
            const cancelButton = document.createElement('button');
            cancelButton.textContent = "Annuler";
            cancelButton.addEventListener('click', () => {
              popup.remove(); // Fermer le popup
            });
  
            const confirmButton = document.createElement('button');
            confirmButton.textContent = "Oui";
            confirmButton.addEventListener('click', () => {
              popup.remove(); // Fermer le popup
              postdata(formattedDate, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v);
            });
  
            buttonsContainer.appendChild(cancelButton);
            buttonsContainer.appendChild(confirmButton);
  
            popup.appendChild(popupMessage);
            popup.appendChild(buttonsContainer);
  
            document.body.appendChild(popup);
          } else {
            message_.textContent = "Un processus est en cours";
          }
        });
    }
  });



  ParamForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const { date_debut_v, selectElement_v, temperature_v, humidite_v, retournement_v, jrs_eclo_v } = updateConsoleLog();
  
    if (date_debut_v) {
      const formattedDate = dateformat(date_debut_v);
      let isok = checkIfisRunning(formattedDate)
        .then(isRunning => {
          if (isRunning) {
            // Créer le popup
            const popup = document.createElement('div');
            popup.classList.add('popup');
  
            // Ajouter le style pour centrer le popup
            popup.style.position = 'fixed';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            popup.style.backgroundColor = 'white';
            popup.style.padding = '20px';
            popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            popup.style.zIndex = '9999';
  
            const popupMessage = document.createElement('p');
            popupMessage.textContent = "Un processus est en cours. Voulez-vous continuer ?";
  
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
          } else {
            message_.textContent = "Un processus est en cours";
          }
        });
    }
  });




  // Authentification avec un serveur OAuth2
async function authenticate(username, password) {
  const response = await fetch('/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: username,
      password: password
    })
  });

  if (response.ok) {
    const { access_token } = await response.json();
    return access_token;
  } else {
    throw new Error('Authentification échouée');
  }
}

// Appel de l'API avec le jeton d'accès
async function fetchProtectedData() {
  const accessToken = await authenticate('mon_utilisateur', 'mon_mot_de_passe');

  const response = await fetch('/api/protected-data', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Accès aux données protégées refusé');
  }
}


// Fonction pour obtenir le token JWT
async function getAccessToken(username, password) {
  try {
      const response = await fetch('http://localhost:5000/oauth/token', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
              'username': username,
              'password': password
          })
      });

      if (!response.ok) {
          throw new Error('Failed to authenticate');
      }

      const data = await response.json();
      return data.access_token;
  } catch (error) {
      console.error('Error:', error);
  }
}

// Fonction pour appeler l'endpoint protégé avec le token JWT
async function getProtectedData(token) {
  try {
      const response = await fetch('http://localhost:5000/api/protected-data', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (!response.ok) {
          throw new Error('Failed to fetch protected data');
      }

      const data = await response.json();
      console.log('Protected data:', data);
  } catch (error) {
      console.error('Error:', error);
  }
}

// Utilisation des fonctions pour authentification et appel de données protégées
(async () => {
  const username = 'mon_utilisateur';  // Remplacez par le nom d'utilisateur approprié
  const password = 'mon_mot_de_passe'; // Remplacez par le mot de passe approprié

  const token = await getAccessToken(username, password);
  
  if (token) {
      await getProtectedData(token);
  }
})();
