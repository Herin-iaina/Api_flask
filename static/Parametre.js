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

// Fonction pour créer une ligne de tableau à partir d'un objet de données
function createTableRow(data) {
  const row = document.createElement('tr');
  for (const key in data) {
      const cell = document.createElement('td');
      cell.textContent = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];
      row.appendChild(cell);
  }
  return row;
}

// Fonction pour créer le tableau HTML
function createTable(data) {
  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');

  // Créer l'en-tête du tableau
  const headerRow = document.createElement('tr');
  const headers = getHeaders(data);
  headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
  });
  tableBody.appendChild(headerRow);

  // Créer les lignes de données
  const rows = getRows(data);
  rows.forEach(item => {
      const row = createTableRow(item);
      tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  return table;
}

// Fonction pour obtenir les en-têtes du tableau
function getHeaders(data) {
  if (Array.isArray(data)) {
      return Object.keys(data[0]);
  } else if (typeof data[0] === 'object') {
      return Object.keys(data[0]);
  } else {
      return Object.keys(data);
  }
}

// Fonction pour obtenir les lignes de données
function getRows(data) {
  if (Array.isArray(data)) {
      return data;
  } else if (typeof data[0] === 'object') {
      return Object.values(data[0]);
  } else {
      return [data];
  }
}

// Obtenir l'élément HTML où tu veux insérer le tableau
const container = document.getElementById('table-container'); 

let dataitem;
const test = 0; // Définir la variable test pour sélectionner les données

if (test == 1) {
  dataitem = data1;
} else if (Test == 2) {
  dataitem = data2;
} else {
  
  dataitem = data3
}
// Créer le tableau et l'ajouter au conteneur
const table = createTable(dataitem);
container.appendChild(table);