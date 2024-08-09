const dataGoogle = [
    {
      "espèce": "Cane",
      "durée_incubation": 28,
      "température_normale": "37.5-38°C",
      "température_max": "38.5°C",
      "température_min": "37°C",
      "humidité_normale": "75-80%",
      "humidité_max": "85%",
      "humidité_min": "70%",
      "tolérance": "±0.5",
      "tolérance_jours": "2-3"
    },
    {
      "espèce": "Poule",
      "durée_incubation": 21,
      "température_normale": "37.5-38°C",
      "température_max": "38.5°C",
      "température_min": "37°C",
      "humidité_normale": "70-75%",
      "humidité_max": "80%",
      "humidité_min": "65%",
      "tolérance": "±0.5",
      "tolérance_jours": "1-2"
    },
    {
      "espèce": "Oie",
      "durée_incubation": "28-30",
      "température_normale": "37.5-38°C",
      "température_max": "38.5°C",
      "température_min": "37°C",
      "humidité_normale": "75-80%",
      "humidité_max": "85%",
      "humidité_min": "70%",
      "tolérance": "±0.5",
      "tolérance_jours": "2-3"
    },
    {
      "espèce": "Caille",
      "durée_incubation": "17-18",
      "température_normale": "37.5-38°C",
      "température_max": "38.5°C",
      "température_min": "37°C",
      "humidité_normale": "70-75%",
      "humidité_max": "80%",
      "humidité_min": "65%",
      "tolérance": "±0.5",
      "tolérance_jours": "1-2"
    }
  ]

  const dataGPT = [{
    "canne": {
      "duree_incubation": "28 à 35 jours",
      "temperature": {
        "normale": 37.5,
        "maximale": 38.0,
        "minimale": 37.0
      },
      "humidite": {
        "normale": {
          "premiere_periode": "55-60%",
          "derniere_periode": "70%"
        },
        "maximale": "75%",
        "minimale": "50%"
      },
      "tolerance_ecarts": {
        "temperature": "±0.5°C pour quelques heures, pas plus de 24 heures",
        "humidite": "1 à 2 jours selon le niveau d'écart"
      }
    },
    "poule": {
      "duree_incubation": "21 jours",
      "temperature": {
        "normale": 37.5,
        "maximale": 38.0,
        "minimale": 37.2
      },
      "humidite": {
        "normale": {
          "premiere_periode": "50-55%",
          "derniere_periode": "65-70%"
        },
        "maximale": "75%",
        "minimale": "40-45%"
      },
      "tolerance_ecarts": {
        "temperature": "±0.5°C pour quelques heures, pas plus de 24 heures",
        "humidite": "1 à 2 jours selon le niveau d'écart"
      }
    },
    "oie": {
      "duree_incubation": "28 à 32 jours",
      "temperature": {
        "normale": 37.2,
        "maximale": 37.8,
        "minimale": 36.8
      },
      "humidite": {
        "normale": {
          "premiere_periode": "55-60%",
          "derniere_periode": "70-75%"
        },
        "maximale": "80%",
        "minimale": "50%"
      },
      "tolerance_ecarts": {
        "temperature": "±0.5°C pour quelques heures, pas plus de 24 heures",
        "humidite": "1 à 2 jours selon le niveau d'écart"
      }
    },
    "caille": {
      "duree_incubation": "16 à 18 jours",
      "temperature": {
        "normale": 37.5,
        "maximale": 38.0,
        "minimale": 37.0
      },
      "humidite": {
        "normale": {
          "premiere_periode": "55-60%",
          "derniere_periode": "65-70%"
        },
        "maximale": "75%",
        "minimale": "50%"
      },
      "tolerance_ecarts": {
        "temperature": "±0.5°C pour quelques heures, pas plus de 24 heures",
        "humidite": "1 à 2 jours selon le niveau d'écart"
      }
    }
  }
  ]

  const dataClaude = [{
    "especes": [
      {
        "nom": "Canne",
        "incubation": {
          "jours": 28,
          "temperature": {
            "normale": 37.5,
            "max": 38,
            "min": 37
          },
          "humidite": {
            "normale": {
              "standard": "55-60",
              "derniers_jours": "65-75"
            },
            "max": 80,
            "min": 50
          },
          "tolerance": {
            "jours": 1,
            "temperature": 0.5,
            "humidite": 5
          }
        }
      },
      {
        "nom": "Poule",
        "incubation": {
          "jours": 21,
          "temperature": {
            "normale": 37.7,
            "max": 38.3,
            "min": 37.2
          },
          "humidite": {
            "normale": {
              "standard": "50-55",
              "derniers_jours": 65
            },
            "max": 70,
            "min": 45
          },
          "tolerance": {
            "jours": 1,
            "temperature": 0.3,
            "humidite": 5
          }
        }
      },
      {
        "nom": "Oie",
        "incubation": {
          "jours": 30,
          "temperature": {
            "normale": 37.5,
            "max": 38,
            "min": 37
          },
          "humidite": {
            "normale": {
              "standard": "55-60",
              "derniers_jours": "70-75"
            },
            "max": 80,
            "min": 50
          },
          "tolerance": {
            "jours": "1-2",
            "temperature": 0.5,
            "humidite": 5
          }
        }
      },
      {
        "nom": "Caille",
        "incubation": {
          "jours": "17-18",
          "temperature": {
            "normale": 37.5,
            "max": 38,
            "min": 37
          },
          "humidite": {
            "normale": {
              "standard": "55-60",
              "derniers_jours": "70-75"
            },
            "max": 75,
            "min": 50
          },
          "tolerance": {
            "jours": 1,
            "temperature": 0.3,
            "humidite": 5
          }
        }
      }
    ],
    "tolerance_generale": {
      "temperature": "Écarts de courte durée (quelques heures) généralement tolérés. Écarts prolongés > 24h peuvent être préjudiciables.",
      "humidite": "Écarts tolérés pendant 1 à 2 jours sans effets néfastes majeurs. Maintien des conditions optimales recommandé."
    }
  }]

// Google 
  
  // Fonction pour créer une ligne de tableau à partir d'un objet de données
  function createTableRow(data) {
    const row = document.createElement('tr');
    
    // Créer les cellules de la ligne
    for (const key in data) {
      const cell = document.createElement('td');
      cell.textContent = data[key];
      row.appendChild(cell);
    }
    
    return row;
  }
  
  // Fonction pour créer le tableau HTML
  function createTable() {
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');
  
    // Créer l'en-tête du tableau
    const headerRow = document.createElement('tr');
    for (const key in data[0]) {
      const th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
    }
    tableBody.appendChild(headerRow);
  
    // Créer les lignes de données
    dataGoogle.forEach(item => {
      const row = createTableRow(item);
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    return table;
  }
  
  // Obtenir l'élément HTML où tu veux insérer le tableau
  const container = document.getElementById('table-container'); // Remplace par l'ID de ton conteneur
  
  // Créer le tableau et l'ajouter au conteneur
  const table = createTable();
  container.appendChild(table);
  
// Claude
// Supposons que les données JSON sont stockées dans une variable appelée 'dataClaude'

function createTable() {
    // Créer la structure de base du tableau
    let table = '<table border="1"><tr><th>Espèce</th><th>Jours d\'incubation</th><th>Température (°C)</th><th>Humidité (%)</th><th>Tolérance</th></tr>';

    // Parcourir les espèces
    data.especes.forEach(espece => {
        table += '<tr>';
        table += `<td>${espece.nom}</td>`;
        table += `<td>${espece.incubation.jours}</td>`;
        
        // Température
        table += '<td>';
        table += `Normale: ${espece.incubation.temperature.normale}<br>`;
        table += `Max: ${espece.incubation.temperature.max}<br>`;
        table += `Min: ${espece.incubation.temperature.min}`;
        table += '</td>';
        
        // Humidité
        table += '<td>';
        table += `Normale: ${espece.incubation.humidite.normale.standard}<br>`;
        table += `Derniers jours: ${espece.incubation.humidite.normale.derniers_jours}<br>`;
        table += `Max: ${espece.incubation.humidite.max}<br>`;
        table += `Min: ${espece.incubation.humidite.min}`;
        table += '</td>';
        
        // Tolérance
        table += '<td>';
        table += `Jours: ±${espece.incubation.tolerance.jours}<br>`;
        table += `Température: ±${espece.incubation.tolerance.temperature}°C<br>`;
        table += `Humidité: ±${espece.incubation.tolerance.humidite}%`;
        table += '</td>';
        
        table += '</tr>';
    });

    table += '</table>';

    // Ajouter la tolérance générale
    table += '<h3>Tolérance Générale :</h3>';
    table += `<p><strong>Température :</strong> ${data.tolerance_generale.temperature}</p>`;
    table += `<p><strong>Humidité :</strong> ${data.tolerance_generale.humidite}</p>`;

    // Insérer le tableau dans le document HTML
    document.getElementById('incubation-table').innerHTML = table;
}

// Appeler la fonction pour créer le tableau
createTable();

// Gpt
function afficherTableauIncubation(data) {
    const tbody = document.getElementById('incubation-table');

    for (const animal in data) {
        const item = data[animal];

        const row = `<tr>
            <td>${animal.charAt(0).toUpperCase() + animal.slice(1)}</td>
            <td>${item.duree_incubation}</td>
            <td>
                Normale: ${item.temperature.normale}°C<br>
                Maximale: ${item.temperature.maximale}°C<br>
                Minimale: ${item.temperature.minimale}°C
            </td>
            <td>
                Normale (Première Période): ${item.humidite.normale.premiere_periode}<br>
                Normale (Dernière Période): ${item.humidite.normale.derniere_periode}<br>
                Maximale: ${item.humidite.maximale}<br>
                Minimale: ${item.humidite.minimale}
            </td>
            <td>
                Température: ${item.tolerance_ecarts.temperature}<br>
                Humidité: ${item.tolerance_ecarts.humidite}
            </td>
        </tr>`;

        tbody.innerHTML += row;
    }
}

// Appeler la fonction pour afficher le tableau après que la page soit chargée
window.onload = function() {
    afficherTableauIncubation(incubationData);
};