// // Supposons que votre réponse JSON est stockée dans la variable 'data'
// const data = [
//   { "hour": "Fri, 26 Jul 2024 08:00:00 GMT", "humidity": "34.00", "temperature": "20.00" },
//   { "hour": "Fri, 26 Jul 2024 18:00:00 GMT", "humidity": "50.00", "temperature": "40.00" }
// ];

// // Extraire les données pour Highcharts
// const categories = data.map(item => item.hour);
// const temperatureData = data.map(item => parseFloat(item.temperature));
// const humidityData = data.map(item => parseFloat(item.humidity));

// // Configuration de Highcharts
// Highcharts.chart('container', {
//     xAxis: {
//         categories: categories
//     },
//     yAxis: {
//         title: {
//             text: 'Température (°C) et Humidité (%)'
//         },
//         // ... autres options de l'axe Y
//     },
//     legend: {
//         // ...
//     },
//     plotOptions: {
//         line: {
//             // ...
//         }
//     },
//     series: [{
//         name: 'Température',
//         data: temperatureData
//     }, {
//         name: 'Humidité',
//         data: humidityData
//     }]
// });


// // let lineLabels =
//  Highcharts.chart('line-labels', {
//         chart: {
//             type: 'line',
//             color : '#FFF',
//             backgroundColor : '#303233',
//             ColorString : '#FFF'
//         },
//         title: {
//             text: 'Monthly Average Temperature',
//             style: {
//                 color: '#FFF',
//                 fontWeight: 'bold'
//             }
//         },
//         subtitle: {
//             text: 'Source: ' +
//                 '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
//                 'target="_blank">Wikipedia.com</a>',
//                 style: {
//                     color: '#FFF',
//                     fontWeight: 'lighter'
//                 }
//         },
//         xAxis: {
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//         },
//         yAxis: {
//             title: {
//                 text: 'Temperature (°C)',
//                 style: {
//                 color: '#FFF',
//                 fontWeight: 'lighter',
//                 }
//             },
//             gridLineColor: 'rgba(255, 255, 0, 0.08)', // Couleur des lignes de grille de l'axe Y
//             lineColor: '#FF0000',     // Couleur de la ligne de l'axe Y
//             tickColor: '#FF0000'      // Couleur des marques de graduation de l'axe Y
//         },
//         legend: {
//             itemStyle: {
//                 color: '#FFF',    // Couleur du texte des légendes
//             },
//             itemHoverStyle: {
//                 color: '#FF00FF'     // Couleur du texte des légendes au survol
//             }
//         },
            
//         plotOptions: {
//             line: {
//                 dataLabels: {
//                     enabled: true
//                 },
//                 enableMouseTracking: false
//             }
//         },
//         series: [{
//             name: 'Reggane',
//             data: [16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2,
//                 22.0, 17.8]
//         }, {
//             name: 'Tallinn',
//             data: [-2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5,
//                 2.0, -0.9]
//         }]
        
//     });



// const dataClaude = [{
//     "especes": [
//       {
//         "nom": "Canne",
//         "incubation": {
//           "jours": 28,
//           "temperature": {
//             "normale": 37.5,
//             "max": 38,
//             "min": 37
//           },
//           "humidite": {
//             "normale": {
//               "standard": "55-60",
//               "derniers_jours": "65-75"
//             },
//             "max": 80,
//             "min": 50
//           },
//           "tolerance": {
//             "jours": 1,
//             "temperature": 0.5,
//             "humidite": 5
//           }
//         }
//       },
//       {
//         "nom": "Poule",
//         "incubation": {
//           "jours": 21,
//           "temperature": {
//             "normale": 37.7,
//             "max": 38.3,
//             "min": 37.2
//           },
//           "humidite": {
//             "normale": {
//               "standard": "50-55",
//               "derniers_jours": 65
//             },
//             "max": 70,
//             "min": 45
//           },
//           "tolerance": {
//             "jours": 1,
//             "temperature": 0.3,
//             "humidite": 5
//           }
//         }
//       },
//       {
//         "nom": "Oie",
//         "incubation": {
//           "jours": 30,
//           "temperature": {
//             "normale": 37.5,
//             "max": 38,
//             "min": 37
//           },
//           "humidite": {
//             "normale": {
//               "standard": "55-60",
//               "derniers_jours": "70-75"
//             },
//             "max": 80,
//             "min": 50
//           },
//           "tolerance": {
//             "jours": "1-2",
//             "temperature": 0.5,
//             "humidite": 5
//           }
//         }
//       },
//       {
//         "nom": "Caille",
//         "incubation": {
//           "jours": "17-18",
//           "temperature": {
//             "normale": 37.5,
//             "max": 38,
//             "min": 37
//           },
//           "humidite": {
//             "normale": {
//               "standard": "55-60",
//               "derniers_jours": "70-75"
//             },
//             "max": 75,
//             "min": 50
//           },
//           "tolerance": {
//             "jours": 1,
//             "temperature": 0.3,
//             "humidite": 5
//           }
//         }
//       }
//     ],
//     "tolerance_generale": {
//       "temperature": "Écarts de courte durée (quelques heures) généralement tolérés. Écarts prolongés > 24h peuvent être préjudiciables.",
//       "humidite": "Écarts tolérés pendant 1 à 2 jours sans effets néfastes majeurs. Maintien des conditions optimales recommandé."
//     }
// }];

// // Fonction pour aplatir les objets imbriqués
// function flattenObject(ob) {
//     let result = {};
//     for (const i in ob) {
//         if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
//             const temp = flattenObject(ob[i]);
//             for (const j in temp) {
//                 result[i + '.' + j] = temp[j];
//             }
//         } else {
//             result[i] = ob[i];
//         }
//     }
//     return result;
// }

// // Fonction pour créer une ligne de tableau à partir d'un objet de données
// function createTableRow(data) {
//     const row = document.createElement('tr');
    
//     // Créer les cellules de la ligne
//     for (const key in data) {
//         const cell = document.createElement('td');
//         cell.textContent = data[key];
//         row.appendChild(cell);
//     }
    
//     return row;
// }

// // Fonction pour créer le tableau HTML
// function createTable(data) {
//     const table = document.createElement('table');
//     const tableBody = document.createElement('tbody');
  
//     // Créer l'en-tête du tableau
//     const headerRow = document.createElement('tr');
//     const flatData = flattenObject(data[0]); // Utiliser le premier élément pour obtenir les clés de l'en-tête
//     for (const key in flatData) {
//         const th = document.createElement('th');
//         th.textContent = key;
//         headerRow.appendChild(th);
//     }
//     tableBody.appendChild(headerRow);
  
//     // Créer les lignes de données
//     data.forEach(item => {
//         const flatItem = flattenObject(item);
//         const row = createTableRow(flatItem);
//         tableBody.appendChild(row);
//     });
  
//     table.appendChild(tableBody);
//     return table;
// }

// // Obtenir l'élément HTML où tu veux insérer le tableau
// const container = document.getElementById('table-container'); // Remplace par l'ID de ton conteneur

// // Créer le tableau et l'ajouter au conteneur
// const table = createTable(dataClaude[0].especes); // Passer la liste des espèces pour la génération du tableau
// container.appendChild(table);



// const data2 = [
//     {
//       "espèce": "Canne",
//       "durée_incubation": 28,
//       "température_normale": "37.5-38",
//       "température_max": "38.5",
//       "température_min": "37",
//       "humidité_normale": "75-80",
//       "humidité_max": "85",
//       "humidité_min": "70",
//       "tolérance": "±0.5",
//       "tolérance_jours": "2-3"
//     },
//     {
//       "espèce": "Poule",
//       "durée_incubation": 21,
//       "température_normale": "37.5-38",
//       "température_max": "38.5",
//       "température_min": "37",
//       "humidité_normale": "70-75",
//       "humidité_max": "80",
//       "humidité_min": "65",
//       "tolérance": "±0.5",
//       "tolérance_jours": "1-2"
//     }
//   ];
  
//   const data1 = [
//     {
//       "especes": [
//         {
//           "nom": "Canne",
//           "incubation": {
//             "jours": 28,
//             "temperature": {
//               "normale": 37.5,
//               "max": 38,
//               "min": 37
//             },
//             "humidite": {
//               "normale": {
//                 "standard": "55-60",
//                 "derniers_jours": "65-75"
//               },
//               "max": 80,
//               "min": 50
//             },
//             "tolerance": {
//               "jours": 1,
//               "temperature": 0.5,
//               "humidite": 5
//             }
//           }
//         },
//         {
//           "nom": "Caille",
//           "incubation": {
//             "jours": "17-18",
//             "temperature": {
//               "normale": 37.5,
//               "max": 38,
//               "min": 37
//             },
//             "humidite": {
//               "normale": {
//                 "standard": "55-60",
//                 "derniers_jours": "70-75"
//               },
//               "max": 75,
//               "min": 50
//             },
//             "tolerance": {
//               "jours": 1,
//               "temperature": 0.3,
//               "humidite": 5
//             }
//           }
//         }
//       ],
//       "tolerance_generale": {
//         "temperature": "Écarts de courte durée (quelques heures) généralement tolérés. Écarts prolongés > 24h peuvent être préjudiciables.",
//         "humidite": "Écarts tolérés pendant 1 à 2 jours sans effets néfastes majeurs. Maintien des conditions optimales recommandé."
//       }
//     }
//   ];

  
//   // Fonction pour créer une ligne de tableau à partir d'un objet de données
//   function createTableRow(data) {
//     const row = document.createElement('tr');
    
//     // Créer les cellules de la ligne
//     for (const key in data) {
//       const cell = document.createElement('td');
//       cell.textContent = data[key];
//       row.appendChild(cell);
//     }
    
//     return row;
//   }
  
//   // Fonction pour créer le tableau HTML
//   function createTable(data) {
//     const table = document.createElement('table');
//     const tableBody = document.createElement('tbody');
  
//     // Créer l'en-tête du tableau
//     const headerRow = document.createElement('tr');
//     for (const key in data[0]) {
//       const th = document.createElement('th');
//       th.textContent = key;
//       headerRow.appendChild(th);
//     }
//     tableBody.appendChild(headerRow);
  
//     // Créer les lignes de données
//     data.forEach(item => {
//       const row = createTableRow(item);
//       tableBody.appendChild(row);
//     });
  
//     table.appendChild(tableBody);
//     return table;
//   }
  
//   // Obtenir l'élément HTML où tu veux insérer le tableau
//   const container = document.getElementById('table-container'); // Remplace par l'ID de ton conteneur
  
//   let dataitem = [];
//   const test = true; // Définir la variable test pour sélectionner les données
//   // Créer le tableau et l'ajouter au conteneur
//   if (test) {
//     dataitem = data1;
//   } else {
//     dataitem = data2;
//   }
//   const table = createTable(dataitem);
//   container.appendChild(table);

  

// // Google 
  
//   // Fonction pour créer une ligne de tableau à partir d'un objet de données
//   function createTableRow(data) {
//     const row = document.createElement('tr');
    
//     // Créer les cellules de la ligne
//     for (const key in data) {
//       const cell = document.createElement('td');
//       cell.textContent = data[key];
//       row.appendChild(
//       );
//     }
    
//     return row;
//   }
  
//   // Fonction pour créer le tableau HTML
//   function createTable() {
//     const table = document.createElement('table');
//     const tableBody = document.createElement('tbody');
  
//     // Créer l'en-tête du tableau
//     const headerRow = document.createElement('tr');
//     for (const key in data[0]) {
//       const th = document.createElement('th');
//       th.textContent = key;
//       headerRow.appendChild(th);
//     }
//     tableBody.appendChild(headerRow);
  
//     // Créer les lignes de données
//     dataGoogle.forEach(item => {
//       const row = createTableRow(item);
//       tableBody.appendChild(row);
//     });
  
//     table.appendChild(tableBody);
//     return table;
//   }
  
//   // Obtenir l'élément HTML où tu veux insérer le tableau
//   const container = document.getElementById('table-container'); // Remplace par l'ID de ton conteneur
  
//   // Créer le tableau et l'ajouter au conteneur
//   const table = createTable();
//   container.appendChild(table);
  
// // Claude
// // Supposons que les données JSON sont stockées dans une variable appelée 'dataClaude'

// function createTable() {
//     // Créer la structure de base du tableau
//     let table = '<table border="1"><tr><th>Espèce</th><th>Jours d\'incubation</th><th>Température (°C)</th><th>Humidité (%)</th><th>Tolérance</th></tr>';

//     // Parcourir les espèces
//     data.especes.forEach(espece => {
//         table += '<tr>';
//         table += `<td>${espece.nom}</td>`;
//         table += `<td>${espece.incubation.jours}</td>`;
        
//         // Température
//         table += '<td>';
//         table += `Normale: ${espece.incubation.temperature.normale}<br>`;
//         table += `Max: ${espece.incubation.temperature.max}<br>`;
//         table += `Min: ${espece.incubation.temperature.min}`;
//         table += '</td>';
        
//         // Humidité
//         table += '<td>';
//         table += `Normale: ${espece.incubation.humidite.normale.standard}<br>`;
//         table += `Derniers jours: ${espece.incubation.humidite.normale.derniers_jours}<br>`;
//         table += `Max: ${espece.incubation.humidite.max}<br>`;
//         table += `Min: ${espece.incubation.humidite.min}`;
//         table += '</td>';
        
//         // Tolérance
//         table += '<td>';
//         table += `Jours: ±${espece.incubation.tolerance.jours}<br>`;
//         table += `Température: ±${espece.incubation.tolerance.temperature}°C<br>`;
//         table += `Humidité: ±${espece.incubation.tolerance.humidite}%`;
//         table += '</td>';
        
//         table += '</tr>';
//     });

//     table += '</table>';

//     // Ajouter la tolérance générale
//     table += '<h3>Tolérance Générale :</h3>';
//     table += `<p><strong>Température :</strong> ${data.tolerance_generale.temperature}</p>`;
//     table += `<p><strong>Humidité :</strong> ${data.tolerance_generale.humidite}</p>`;

//     // Insérer le tableau dans le document HTML
//     document.getElementById('incubation-table').innerHTML = table;
// }

// // Appeler la fonction pour créer le tableau
// createTable();

// // Gpt
// function afficherTableauIncubation(data) {
//     const tbody = document.getElementById('incubation-table');

//     for (const animal in data) {
//         const item = data[animal];

//         const row = `<tr>
//             <td>${animal.charAt(0).toUpperCase() + animal.slice(1)}</td>
//             <td>${item.duree_incubation}</td>
//             <td>
//                 Normale: ${item.temperature.normale}°C<br>
//                 Maximale: ${item.temperature.maximale}°C<br>
//                 Minimale: ${item.temperature.minimale}°C
//             </td>
//             <td>
//                 Normale (Première Période): ${item.humidite.normale.premiere_periode}<br>
//                 Normale (Dernière Période): ${item.humidite.normale.derniere_periode}<br>
//                 Maximale: ${item.humidite.maximale}<br>
//                 Minimale: ${item.humidite.minimale}
//             </td>
//             <td>
//                 Température: ${item.tolerance_ecarts.temperature}<br>
//                 Humidité: ${item.tolerance_ecarts.humidite}
//             </td>
//         </tr>`;

//         tbody.innerHTML += row;
//     }
// }

// // Appeler la fonction pour afficher le tableau après que la page soit chargée
// window.onload = function() {
//     afficherTableauIncubation(incubationData);
// };

// const data3 = [{
//     "canne": {
//       "duree_incubation": "28 à 35 jours",
//       "temperature": {
//         "normale": 37.5,
//         "maximale": 38.0,
//         "minimale": 37.0
//       },
//       "humidite": {
//         "normale": {
//           "premiere_periode": "55-60%",
//           "derniere_periode": "70%"
//         },
//         "maximale": "75%",
//         "minimale": "50%"
//       },
//       "tolerance_ecarts": {
//         "temperature": "±0.5°C pour quelques heures, pas plus de 24 heures",
//         "humidite": "1 à 2 jours selon le niveau d'écart"
//       }
//     },
//     "poule": {
//       "duree_incubation": "21 jours",
//       "temperature": {
//         "normale": 37.5,
//         "maximale": 38.0,
//         "minimale": 37.2
//       },
//       "humidite": {
//         "normale": {
//           "premiere_periode": "50-55%",
//           "derniere_periode": "65-70%"
//         },
//         "maximale": "75%",
//         "minimale": "40-45%"
//       },
//       "tolerance_ecarts": {
//         "temperature": "±0.5°C pour quelques heures, pas plus de 24 heures",
//         "humidite": "1 à 2 jours selon le niveau d'écart"
//       }
//     }
// }]

// const data2 = [
//     {
//       "espèce": "Canne",
//       "durée_incubation": 28,
//       "température_normale": "37.5-38",
//       "température_max": "38.5",
//       "température_min": "37",
//       "humidité_normale": "75-80",
//       "humidité_max": "85",
//       "humidité_min": "70",
//       "tolérance": "±0.5",
//       "tolérance_jours": "2-3"
//     },
//     {
//       "espèce": "Poule",
//       "durée_incubation": 21,
//       "température_normale": "37.5-38",
//       "température_max": "38.5",
//       "température_min": "37",
//       "humidité_normale": "70-75",
//       "humidité_max": "80",
//       "humidité_min": "65",
//       "tolérance": "±0.5",
//       "tolérance_jours": "1-2"
//     }
//   ];
  
//   const data1 = [
//     {
//       "especes": [
//         {
//           "nom": "Canne",
//           "incubation": {
//             "jours": 28,
//             "temperature": {
//               "normale": 37.5,
//               "max": 38,
//               "min": 37
//             },
//             "humidite": {
//               "normale": {
//                 "standard": "55-60",
//                 "derniers_jours": "65-75"
//               },
//               "max": 80,
//               "min": 50
//             },
//             "tolerance": {
//               "jours": 1,
//               "temperature": 0.5,
//               "humidite": 5
//             }
//           }
//         },
//         {
//           "nom": "Caille",
//           "incubation": {
//             "jours": "17-18",
//             "temperature": {
//               "normale": 37.5,
//               "max": 38,
//               "min": 37
//             },
//             "humidite": {
//               "normale": {
//                 "standard": "55-60",
//                 "derniers_jours": "70-75"
//               },
//               "max": 75,
//               "min": 50
//             },
//             "tolerance": {
//               "jours": 1,
//               "temperature": 0.3,
//               "humidite": 5
//             }
//           }
//         }
//       ],
//       "tolerance_generale": {
//         "temperature": "Écarts de courte durée (quelques heures) généralement tolérés. Écarts prolongés > 24h peuvent être préjudiciables.",
//         "humidite": "Écarts tolérés pendant 1 à 2 jours sans effets néfastes majeurs. Maintien des conditions optimales recommandé."
//       }
//     }
//   ];
//   // Fonction pour créer une ligne de tableau à partir d'un objet de données
// function createTableRow(data) {
//     const row = document.createElement('tr');
    
//     // Créer les cellules de la ligne
//     for (const key in data) {
//       const cell = document.createElement('td');
//       cell.textContent = data[key];
//       row.appendChild(cell);
//     }
    
//     return row;
//   }
  
//   // Fonction pour créer le tableau HTML
//   function createTable(data) {
//     const table = document.createElement('table');
//     const tableBody = document.createElement('tbody');
  
//     // Créer l'en-tête du tableau
//     const headerRow = document.createElement('tr');
//     for (const key in data[0]) {
//       const th = document.createElement('th');
//       th.textContent = key;
//       headerRow.appendChild(th);
//     }
//     tableBody.appendChild(headerRow);
  
//     // Créer les lignes de données
//     data.forEach(item => {
//       const row = createTableRow(item);
//       tableBody.appendChild(row);
//     });
  
//     table.appendChild(tableBody);
//     return table;
//   }
  
//   // Obtenir l'élément HTML où tu veux insérer le tableau
//   const container = document.getElementById('table-container'); // Remplace par l'ID de ton conteneur
  
//   let dataitem = [];
//   const test = 0; // Définir la variable test pour sélectionner les données
  
//   if (test == 1) {
//     dataitem = data1;
//   } else if (Test == 2) {
//     dataitem = data2;
//   } else {
    
//     dataitem = data3
//   }
//   // Créer le tableau et l'ajouter au conteneur
//   const table = createTable(dataitem);
//   container.appendChild(table);



// const data3 = [{ "canne": { "duree_incubation": "28 à 35 jours", "temperature": { "normale": 37.5, "maximale": 38.0, "minimale": 37.0 }, "humidite": { "normale": { "premiere_periode": "55-60%", "derniere_periode": "70%" }, "maximale": "75%", "minimale": "50%" }, "tolerance_ecarts": { "temperature": "±0.5°C pour quelques heures, pas plus de 24 heures", "humidite": "1 à 2 jours selon le niveau d'écart" } }, "poule": { "duree_incubation": "21 jours", "temperature": { "normale": 37.5, "maximale": 38.0, "minimale": 37.2 }, "humidite": { "normale": { "premiere_periode": "50-55%", "derniere_periode": "65-70%" }, "maximale": "75%", "minimale": "40-45%" }, "tolerance_ecarts": { "temperature": "±0.5°C pour quelques heures, pas plus de 24 heures", "humidite": "1 à 2 jours selon le niveau d'écart" } } }];

// const data2 = [ { "espèce": "Canne", "durée_incubation": 28, "température_normale": "37.5-38", "température_max": "38.5", "température_min": "37", "humidité_normale": "75-80", "humidité_max": "85", "humidité_min": "70", "tolérance": "±0.5", "tolérance_jours": "2-3" }, { "espèce": "Poule", "durée_incubation": 21, "température_normale": "37.5-38", "température_max": "38.5", "température_min": "37", "humidité_normale": "70-75", "humidité_max": "80", "humidité_min": "65", "tolérance": "±0.5", "tolérance_jours": "1-2" } ];

// const data1 = [ { "especes": [ { "nom": "Canne", "incubation": { "jours": 28, "temperature": { "normale": 37.5, "max": 38, "min": 37 }, "humidite": { "normale": { "standard": "55-60", "derniers_jours": "65-75" }, "max": 80, "min": 50 }, "tolerance": { "jours": 1, "temperature": 0.5, "humidite": 5 } } }, { "nom": "Caille", "incubation": { "jours": "17-18", "temperature": { "normale": 37.5, "max": 38, "min": 37 }, "humidite": { "normale": { "standard": "55-60", "derniers_jours": "70-75" }, "max": 75, "min": 50 }, "tolerance": { "jours": 1, "temperature": 0.3, "humidite": 5 } } } ], "tolerance_generale": { "temperature": "Écarts de courte durée (quelques heures) généralement tolérés. Écarts prolongés > 24h peuvent être préjudiciables.", "humidite": "Écarts tolérés pendant 1 à 2 jours sans effets néfastes majeurs. Maintien des conditions optimales recommandé." } } ];

// // Fonction pour créer une ligne de tableau à partir d'un objet de données
// function createTableRow(data) {
//     const row = document.createElement('tr');
//     for (const key in data) {
//         const cell = document.createElement('td');
//         cell.textContent = JSON.stringify(data[key]);
//         row.appendChild(cell);
//     }
//     return row;
// }

// // Fonction pour créer le tableau HTML
// function createTable(data) {
//     const table = document.createElement('table');
//     const tableBody = document.createElement('tbody');

//     // Créer l'en-tête du tableau
//     const headerRow = document.createElement('tr');
//     for (const key in data[0]) {
//         const th = document.createElement('th');
//         th.textContent = key;
//         headerRow.appendChild(th);
//     }
//     tableBody.appendChild(headerRow);

//     // Créer les lignes de données
//     data.forEach(item => {
//         const row = createTableRow(item);
//         tableBody.appendChild(row);
//     });

//     table.appendChild(tableBody);
//     return table;
// }

// // Obtenir l'élément HTML où tu veux insérer le tableau
// const container = document.getElementById('table-container'); // Remplace par l'ID de ton conteneur

// // Fonction pour afficher les données
// function displayData(dataSet) {
//     // Nettoyer le conteneur
//     container.innerHTML = '';
    
//     // Traiter les données selon leur structure
//     let processedData;
//     if (dataSet === data1) {
//         processedData = data1[0].especes.map(espece => ({
//             nom: espece.nom,
//             ...espece.incubation
//         }));
//     } else if (dataSet === data2) {
//         processedData = data2;
//     } else if (dataSet === data3) {
//         processedData = Object.entries(data3[0]).map(([key, value]) => ({
//             espece: key,
//             ...value
//         }));
//     }

//     // Créer et afficher le tableau
//     const table = createTable(processedData);
//     container.appendChild(table);
// }

// // Boutons pour changer les données affichées
// const btn1 = document.createElement('button');
// btn1.textContent = 'Afficher Data 1';
// btn1.onclick = () => displayData(data1);

// const btn2 = document.createElement('button');
// btn2.textContent = 'Afficher Data 2';
// btn2.onclick = () => displayData(data2);

// const btn3 = document.createElement('button');
// btn3.textContent = 'Afficher Data 3';
// btn3.onclick = () => displayData(data3);

// // Ajouter les boutons au document
// document.body.insertBefore(btn3, container);
// document.body.insertBefore(btn2, container);
// document.body.insertBefore(btn1, container);

// // Afficher les données initiales (par exemple, data1)
// displayData(data1);




//   // Fonction pour créer une ligne de tableau à partir d'un objet de données
// function createTableRow(data) {
//     const row = document.createElement('tr');
//     for (const key in data) {
//         const cell = document.createElement('td');
//         cell.textContent = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];
//         row.appendChild(cell);
//     }
//     return row;
// }

// // Fonction pour créer le tableau HTML
// function createTable(data) {
//     const table = document.createElement('table');
//     const tableBody = document.createElement('tbody');

//     // Créer l'en-tête du tableau
//     const headerRow = document.createElement('tr');
//     const headers = getHeaders(data);
//     headers.forEach(header => {
//         const th = document.createElement('th');
//         th.textContent = header;
//         headerRow.appendChild(th);
//     });
//     tableBody.appendChild(headerRow);

//     // Créer les lignes de données
//     const rows = getRows(data);
//     rows.forEach(item => {
//         const row = createTableRow(item);
//         tableBody.appendChild(row);
//     });

//     table.appendChild(tableBody);
//     return table;
// }

// // Fonction pour obtenir les en-têtes du tableau
// function getHeaders(data) {
//     if (Array.isArray(data)) {
//         return Object.keys(data[0]);
//     } else if (typeof data[0] === 'object') {
//         return Object.keys(data[0]);
//     } else {
//         return Object.keys(data);
//     }
// }

// // Fonction pour obtenir les lignes de données
// function getRows(data) {
//     if (Array.isArray(data)) {
//         return data;
//     } else if (typeof data[0] === 'object') {
//         return Object.values(data[0]);
//     } else {
//         return [data];
//     }
// }

// // Obtenir l'élément HTML où tu veux insérer le tableau
// const container = document.getElementById('table-container'); // Remplace par l'ID de ton conteneur

// // Définir la variable test pour sélectionner les données
// const test = 3; // Changer cette valeur pour tester différents jeux de données

// let dataitem;
// if (test === 1) {
//     dataitem = data1;
// } else if (test === 2) {
//     dataitem = data2;
// } else {
//     dataitem = data3;
// }

// // Créer le tableau et l'ajouter au conteneur
// container.innerHTML = '';
// const table = createTable(dataitem);
// container.appendChild(table);

// // Fonction pour créer une ligne de tableau à partir d'un objet de données
// function createTableRow(data) {
//     const row = document.createElement('tr');
//     for (const key in data) {
//         const cell = document.createElement('td');
//         cell.textContent = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];
//         row.appendChild(cell);
//     }
//     return row;
//   }
  
//   // Fonction pour créer le tableau HTML
//   function createTable(data) {
//     const table = document.createElement('table');
//     table.classList.add('table table-bordered table-responsive-stack');
//     const tableBody = document.createElement('tbody');
    
  
//     // Créer l'en-tête du tableau
//     const headerRow = document.createElement('tr');
//     const headers = getHeaders(data);
//     headers.forEach(header => {
//         const th = document.createElement('th');
//         th.textContent = header;
//         headerRow.appendChild(th);
//     });
//     tableBody.appendChild(headerRow);
  
//     // Créer les lignes de données
//     const rows = getRows(data);
//     rows.forEach(item => {
//         const row = createTableRow(item);
//         tableBody.appendChild(row);
//     });
  
//     table.appendChild(tableBody);
//     return table;
//   }
  
//   // Fonction pour obtenir les en-têtes du tableau
//   function getHeaders(data) {
//     if (Array.isArray(data)) {
//         return Object.keys(data[0]);
//     } else if (typeof data[0] === 'object') {
//         return Object.keys(data[0]);
//     } else {
//         return Object.keys(data);
//     }
//   }
  
//   // Fonction pour obtenir les lignes de données
//   function getRows(data) {
//     if (Array.isArray(data)) {
//         return data;
//     } else if (typeof data[0] === 'object') {
//         return Object.values(data[0]);
//     } else {
//         return [data];
//     }
//   }
  
//   // Obtenir l'élément HTML où tu veux insérer le tableau
//   const container = document.getElementById('table-container'); 
  
//   // Créer le tableau et l'ajouter au conteneur
  
//   if (container) { // Vérifier si le conteneur existe
//     let dataitem;
//     const test = 1; // Définir la variable test pour sélectionner les données
  
//     if (test === 1) {
//       dataitem = data1;
//     } else if (test === 2) {
//       dataitem = data2;
//     } else {
//       dataitem = data3;
//     }
  
//     // Créer le tableau et l'ajouter au conteneur
//     const table = createTable(dataitem);
//     container.appendChild(table);
//   } else {
//     console.error('Le conteneur "table-container" n\'existe pas.');
//   }


// function createTable(data) {
//     const table = document.createElement('table');
//     const thead = table.createTHead();
//     const tbody = table.createTBody();
  
//     // Récupérer les clés du premier objet pour les en-têtes
//     const headers = Object.keys(data[0]);
  
//     // Créer la ligne d'en-tête
//     const headerRow = thead.insertRow();
//     headers.forEach(header => {
//       const th = document.createElement('th');
//       th.textContent = header;
//       headerRow.appendChild(th);
//     });
  
//     // Créer les lignes de données
//     data.forEach(item => {
//       const row = tbody.insertRow();
//       headers.forEach(header => {
//         const cell = row.insertCell();
//         // Accéder à la valeur en utilisant la notation pointée ou bracket
//         cell.textContent = item[header];
//       });
//     });
  
//     return table;
//   }
  

// function createTable(data) {
//     function getHeaders(data) {
//       if (!Array.isArray(data) || data.length === 0) {
//         console.error('Les données ne sont pas un tableau ou sont vides');
//         return [];
//       }
  
//       const firstItem = data[0];
      
//       if (firstItem.hasOwnProperty('espèces')) {
//         console.log("C'est dataClaude");
//         return Claudedata(data);
//       } else if (firstItem.hasOwnProperty('espèce')) {
//         console.log("C'est dataGoogle");
//         return googledata(data);
//       } else if (firstItem.hasOwnProperty('canne')) {
//         console.log("C'est dataGPT");
//         return gtpdata(data);
//       } else {
//         console.error("Structure de données inconnue");
//         return [];
//       }
//     }   
  
//     function gtpdata(dataGPT) {
//       const result = [];
//       for (const [espece, details] of Object.entries(dataGPT[0])) {
//         result.push({
//           espece,
//           duree_incubation: details.duree_incubation,
//           temperature_normale: details.temperature.normale,
//           temperature_max: details.temperature.maximale,
//           temperature_min: details.temperature.minimale,
//           humidite_normale: `${details.humidite.normale.premiere_periode}, ${details.humidite.normale.derniere_periode}`,
//           humidite_max: details.humidite.maximale,
//           humidite_min: details.humidite.minimale,
//           tolerance_temperature: details.tolerance_ecarts.temperature,
//           tolerance_humidite: details.tolerance_ecarts.humidite
//         });
//       }
//       return result;
//     }
  
//     function googledata(dataGoogle) {
//       return dataGoogle;
//     }
  
//     function Claudedata(dataClaude) {
//       return dataClaude[0].especes.map(espece => ({
//         espèce: espece.nom,
//         durée_incubation: espece.incubation.jours,
//         température_normale: espece.incubation.temperature.normale,
//         température_max: espece.incubation.temperature.max,
//         température_min: espece.incubation.temperature.min,
//         humidité_normale: espece.incubation.humidite.normale.standard,
//         humidité_max: espece.incubation.humidite.max,
//         humidité_min: espece.incubation.humidite.min,
//         tolérance: espece.incubation.tolerance.temperature,
//         tolérance_jours: espece.incubation.tolerance.jours
//       }));
//     }
  
//     const processedData = getHeaders(data);
//     const headers = Object.keys(processedData[0]);
  
//     let tableHTML = '<table class="table table-bordered table-responsive-stack"><thead><tr>';
//     headers.forEach(header => {
//       tableHTML += `<th>${header}</th>`;
//     });
//     tableHTML += '</tr></thead><tbody>';
  
//     processedData.forEach(item => {
//       tableHTML += '<tr>';
//       headers.forEach(header => {
//         const cellContent = typeof item[header] === 'object' ? JSON.stringify(item[header]) : item[header];
//         tableHTML += `<td>${cellContent}</td>`;
//       });
//       tableHTML += '</tr>';
//     });
  
//     tableHTML += '</tbody></table>';
//     return tableHTML;
//   }


//   // Fonction pour activer le lien cliqué et désactiver les autres
// function activateLink(event) {
//     // Désactive toutes les classes 'active' des liens
//     const navLinks = document.querySelectorAll('.nav-link');
//     navLinks.forEach(link => link.classList.remove('active'));

//     // Active le lien cliqué
//     event.target.classList.add('active');
// }

// // Fonctions spécifiques à chaque lien
// function handleNav1Click() {
//     console.log('Lien 1 cliqué');
// }

// function handleNav2Click() {
//     console.log('Lien 2 cliqué');
// }

// function handleNav3Click() {
//     console.log('Lien 3 cliqué');
// }

// // Ajout des écouteurs d'événements pour chaque lien
// document.getElementById('nav1').addEventListener('click', function(event) {
//     activateLink(event);
//     handleNav1Click();
// });

// document.getElementById('nav2').addEventListener('click', function(event) {
//     activateLink(event);
//     handleNav2Click();
// });

// document.getElementById('nav3').addEventListener('click', function(event) {
//     activateLink(event);
//     handleNav3Click();
// });


// Fonction pour créer le tableau HTML
function createTable(data) {
  // Fonction pour obtenir les en-têtes du tableau
  function getHeaders(data) {
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Les données ne sont pas un tableau ou sont vides');
      return [];
    }

    const firstItem = data[0];

    if (firstItem.hasOwnProperty('espèces')) {
      console.log("C'est dataClaude");
      return Claudedata(data);
    } else if (firstItem.hasOwnProperty('espèce')) {
      console.log("C'est data Google");
      return googledata(data);
    } else if (firstItem.hasOwnProperty('canne')) {
      console.log("C'est dataGPT");
      return gptdata(data);
    } else {
      console.error("Structure de données inconnue");
      return [];
    }
  }

  // Fonction pour traiter les données de GPT
  function gptdata(dataGPT) {
    return dataGPT.map(item => ({
      espece: item.espece,
      duree_incubation: item.duree_incubation,
      temperature_normale: item.temperature.normale,
      temperature_max: item.temperature.maximale,
      temperature_min: item.temperature.minimale,
      humidite_normale: `${item.humidite.normale.premiere_periode}, ${item.humidite.normale.derniere_periode}`,
      humidite_max: item.humidite.maximale,
      humidite_min: item.humidite.minimale,
      tolerance_temperature: item.tolerance_ecarts.temperature,
      tolerance_humidite: item.tolerance_ecarts.humidite
    }));
  }

  // Fonction pour traiter les données de Google
  function googledata(dataGoogle) {
    return dataGoogle.map(item => ({
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
    }));
  }

  // Fonction pour traiter les données de Claude
  function Claudedata(dataClaude) {
    return dataClaude[0].especes.map(espece => ({
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
  }

  const processedData = getHeaders(data);
  if (processedData.length === 0) return ''; // Vérifie si les données sont valides

  let tableHTML = '<table class="table table-bordered table-responsive-stack table-primary"><thead><tr>';
  const headers = Object.keys(processedData[0]);

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

// Fonction pour générer le tableau
function generateTable(dataItem) {
  const container = document.getElementById('table-container');
  if (!container) {
    console.error('Le conteneur "table-container" n\'existe pas.');
    return;
  }

  container.innerHTML = '';

  let data;
  if (dataItem === 1) {
    data = dataGoogle;
  } else if (dataItem === 2) {
    data = dataGPT;
  } else if (dataItem === 3) {
    data = dataClaude;
  } else {
    console.error('Données invalides.');
    return;
  }

  container.innerHTML = createTable(data);
}

// Fonction pour activer le lien cliqué et désactiver les autres
function activateLink(event) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
  event.target.classList.add('active');
}

// Ajout des écouteurs d'événements pour chaque lien
document.getElementById('google').addEventListener('click', function(event) {
  activateLink(event);
  generateTable(1);
});

document.getElementById('gpt').addEventListener('click', function(event) {
  activateLink(event);
  generateTable(2);
});

document.getElementById('claude').addEventListener('click', function(event) {
  activateLink(event);
  generateTable(3);
});


//yyyyyyyyyyyyyy
// Fonction pour créer le tableau HTML
function createTable(data) {
  // Fonction pour obtenir les en-têtes du tableau
  function getHeaders(data) {
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Les données ne sont pas un tableau ou sont vides');
      return [];
    }

    const firstItem = data[0];

    if (firstItem.hasOwnProperty('espèces')) {
      console.error("Structure de données inconnue");
      return [];
    } else if (firstItem.hasOwnProperty('espèce')) {
      console.log("C'est data Google");
      return googledata(data);
    } else if (firstItem.hasOwnProperty('canne')) {
      console.log("C'est dataGPT");
      return gtpdata(data);
    } else {
      console.log("C'est dataClaude");
      return Claudedata(data);
    }
  }

  // Fonction pour traiter les données de GPT
  function gtpdata(dataGPT) {
    const result = dataGPT.map(item => ({
      espece: item.espece,
      duree_incubation: item.duree_incubation,
      temperature_normale: item.temperature.normale,
      temperature_max: item.temperature.maximale,
      temperature_min: item.temperature.minimale,
      humidite_normale: `${item.humidite.normale.premiere_periode}, ${item.humidite.normale.derniere_periode}`,
      humidite_max: item.humidite.maximale,
      humidite_min: item.humidite.minimale,
      tolerance_temperature: item.tolerance_ecarts.temperature,
      tolerance_humidite: item.tolerance_ecarts.humidite
    }));
    console.table(result);
    return result;
  }

  // Fonction pour traiter les données de Google
  function googledata(dataGoogle) {
    const result = dataGoogle.map(item => ({
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
    }));
    console.table(result);
    return result;
  }

  // Fonction pour traiter les données de Claude
  function Claudedata(dataClaude) {
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

// Fonction pour générer le tableau
function generateTable(dataItem) {
  const container = document.getElementById('table-container');
  if (!container) {
    console.error('Le conteneur "table-container" n\'existe pas.');
    return;
  }

  container.innerHTML = '';

  let data;
  if (dataItem === 1) {
    data = dataGoogle;
  } else if (dataItem === 2) {
    data = dataGPT;
  } else if (dataItem === 3) {
    data = dataClaude;
  } else {
    console.error('Données invalides.');
    return;
  }

  container.innerHTML = createTable(data);
}

// Fonction pour activer le lien cliqué et désactiver les autres
function activateLink(event) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
  event.target.classList.add('active');
}

// Ajout des écouteurs d'événements pour chaque lien
document.getElementById('google').addEventListener('click', function(event) {
  activateLink(event);
  generateTable(1);
});

document.getElementById('gpt').addEventListener('click', function(event) {
  activateLink(event);
  generateTable(2);
});

document.getElementById('claude').addEventListener('click', function(event) {
  activateLink(event);
  generateTable(3);
});
