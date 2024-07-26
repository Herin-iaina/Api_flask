

// let lineLabels =
function updateChartLineLabels(categories, temperatureData, humidityData) {
    Highcharts.chart('line-labels', {
        chart: {
            type: 'spline',
            color : '#FFF',
            // backgroundColor : '#303233',
            ColorString : '#FFF'
        },
        title: {
            text: 'Daily Average Temperature',
            style: {
                color: '#FFF',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Source: ' +
                '<p> ESP32</p>',
                style: {
                    color: '#FFF',
                    fontWeight: 'lighter'
                }
        },
        xAxis: {
            categories: categories,
            accessibility: {
                description: 'Months of the year'
            }
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)',
                style: {
                color: '#FFF',
                fontWeight: 'lighter',
                }
            },
            labels: {
                format: '{value}°'
            },
            gridLineColor: 'rgba(255, 255, 0, 0.08)', // Couleur des lignes de grille de l'axe Y
            lineColor: '#FF0000',     // Couleur de la ligne de l'axe Y
            tickColor: '#FF0000'      // Couleur des marques de graduation de l'axe Y
        },
        legend: {
            itemStyle: {
                color: '#FFF',    // Couleur du texte des légendes
            },
            itemHoverStyle: {
                color: '#FF00FF'     // Couleur du texte des légendes au survol
            }
        },
            
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Temperature',
            data: temperatureData
        }, {
            name: 'Humidité',
            data: humidityData
        }]
        
    });
}
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



// --------Temp--------------
const gaugeOptions = {
    chart: {
        type: 'solidgauge',
        backgroundColor : 'rgba(41,46,51,1)'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '150%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    exporting: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.2, '#f9e79b'], // 
            [0.5, '#55BF3B'], // green
            [0.6, '#DF5353'] // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -50,
            style: {
                color: '#FFF',
                fontWeight: 'bold'
            }
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};  

// let maRequete = $.ajax({
//     url: 'http://127.0.0.1:5005/alldataalldata',
//     type: 'GET',
//     headers : {
//         "X-API-KEY": "votre_cle_api_1"
//       },
// });

// Fonction pour faire la requête GET à l'API
function fetchWeatherData() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://127.0.0.1:5005/WeatherData', 
            type: 'GET',
            headers : {
                        "X-API-KEY": "votre_cle_api_1"
                        },
            success: (response) => {
                console.log(response);
                resolve(response);
                //resolve(response.temperature); // Suppose que la température est dans response.temperature
            },
            error: (error) => {
                reject(error);
            }
        });
    });
}
  

// Utilisation de la promesse pour mettre à jour le graphique
//   fetchTemperature()
function updateData() {
    fetchWeatherData()
    .then(data => {
        // Validation des données
        if (!isNaN(data.temperature) && !isNaN(data.humidity) &&
            !isNaN(data.average_temperature) && !isNaN(data.average_humidity)) {

            // Créer les graphiques
            Highcharts.chart('Average-temp', Highcharts.merge(gaugeOptions, {
                // ... configuration du graphique pour la température moyenne
                yAxis: {
                    min: 0,
                    max: 60,
                    title: {
                    text: 'Average temperature'
                    }
                },
        
                credits: {
                enabled: false
                },
                series: [{
                    name: '°C',
                    data: [data.average_temperature],
                    dataLabels: {
                        format:
                        '<div style="text-align:center">' +
                        '<span style="font-size:25px">{y}</span><br/>' +
                        '<span style="font-size:12px;opacity:0.4"> °C </span>' +
                        '</div>'
                    },
                    tooltip: {
                        valueSuffix: ' °C '
                    }
                }]
            }));

            Highcharts.chart('Average-Humid', Highcharts.merge(gaugeOptions, {
                // ... configuration du graphique pour l'humidité moyenne
                yAxis: {
                    min: 0,
                    max: 80,
                    title: {
                        text: 'Average humidity'
                    }
                },
            
                credits: {
                    enabled: false
                },

                series: [{
                    name: '%',
                    data: [data.average_humidity],
                    dataLabels: {
                        format:
                        '<div style="text-align:center">' +
                        '<span style="font-size:25px">{y}</span><br/>' +
                        '<span style="font-size:12px;opacity:0.4"> % </span>' +
                        '</div>'
                    },
                    tooltip: {
                        valueSuffix: ' % '
                    }
                }],
            }));

            // Mettre à jour le graphique de la température en temps réel
            Highcharts.chart('Max-Temp',Highcharts.merge(gaugeOptions, {
                // ... configuration du graphique pour la température max
                yAxis: {
                    min: 0,
                    max: 60,
                    title: {
                        text: 'Max Temperature'
                    }
                },
            
                credits: {
                    enabled: false
                },

                series: [{
                    name: '°C',
                    data: [data.temperature],
                    dataLabels: {
                        format:
                        '<div style="text-align:center">' +
                        '<span style="font-size:25px">{y}</span><br/>' +
                        '<span style="font-size:12px;opacity:0.4"> °C </span>' +
                        '</div>'
                    },
                    tooltip: {
                        valueSuffix: ' °C '
                    }
                }]
            }));

            Highcharts.chart('Max-Humid', Highcharts.merge(gaugeOptions, {
                // ... configuration du graphique pour l'humitidé max
                yAxis: {
                    min: 0,
                    max: 80,
                    title: {
                        text: 'Max humidity'
                    }
                },
            
                credits: {
                    enabled: false
                },
                series: [{
                    name: '%',
                    data: [data.humidity],
                    dataLabels: {
                        format:
                        '<div style="text-align:center">' +
                        '<span style="font-size:25px">{y}</span><br/>' +
                        '<span style="font-size:12px;opacity:0.4"> % </span>' +
                        '</div>'
                    },
                    tooltip: {
                        valueSuffix: ' % '
                    }
                }]
            }));

        } else {
            console.error('Données invalides reçues de l\'API');
            // Afficher un message à l'utilisateur
            alert('Une erreur s\'est produite lors du chargement des données.');
        }
    })
    .catch(error => {
        console.error('Erreur lors de la requête:', error);
        // Gérer les erreurs, par exemple afficher un message à l'utilisateur
    });
}

// updateData();
// setInterval(updateData, 2000);


//   fetchTemperature()
//     .then(response => {

//         if (!isNaN(data.temperature) && !isNaN(data.humidity) &&
//       !isNaN(data.average_temperature) && !isNaN(data.average_humidity)) {
//         // Créer un tableau pour les données de la température
//         const temperatureData = data.temperature;

//         // Créer un tableau pour les données de l'humidité
//         const humidityData = data.humidity;

//         // Créer un tableau pour les données de l'average_temperature
//         const AvgtemperatureData = data.average_temperature;

//          // Créer un tableau pour les données de l'average_humidity
//          const AvghumidityData = data.average_humidity;
//       }
//         // The temperature gauge
//         const chartTemperature = Highcharts.chart('Average-temp', Highcharts.merge(gaugeOptions, {
//             yAxis: {
//             min: 0,
//             max: 60,
//             title: {
//             text: 'Average temperature'
//         }
//         },
  
//         credits: {
//           enabled: false
//         },
  
//         series: [{
//           name: '°C',
//           data: [temperature],
//           dataLabels: {
//             format:
//               '<div style="text-align:center">' +
//               '<span style="font-size:25px">{y}</span><br/>' +
//               '<span style="font-size:12px;opacity:0.4"> °C </span>' +
//               '</div>'
//           },
//           tooltip: {
//             valueSuffix: ' °C '
//           }
//         }]
  
//       }));


//     })
//     .catch(error => {
//       console.error('Erreur lors de la récupération de la température:', error);
//       // Gérer les erreurs, par exemple afficher un message à l'utilisateur
//     });
  


// Fonction pour faire la requête GET à l'API
function fetchWeatherData() {
    return fetch('http://127.0.0.1:5005/WeatherDF', {
      headers: {
        "X-API-KEY": "votre_cle_api_1"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur réseau : ${response.statusText}`);
      }
      const data = response.json();
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données:', error);
      throw error; // Rejeter la promesse pour une gestion ultérieure
    });
  }
  
  function updateDataGraph() {
    fetchWeatherData()
    .then(data => {
      // Validation des données
      if (!Array.isArray(data)) {
        throw new Error('Les données reçues ne sont pas un tableau.');
      }
  
      const categories = data.map(item => item.hour);
      const temperatureData = data.map(item => parseFloat(item.temperature));
      const humidityData = data.map(item => parseFloat(item.humidity));
  
      // Vérification supplémentaire : s'assurer que tous les éléments sont définis
      if (categories.some(item => !item) || temperatureData.some(item => isNaN(item)) || humidityData.some(item => isNaN(item))) {
        throw new Error('Les données contiennent des valeurs manquantes ou invalides.');
      }
  
      // Mettre à jour le graphique
    //   updateChart(categories, temperatureData, humidityData);
    console.log(categories);
    console.log(temperatureData);
    console.log(humidityData);
    // Nouveau tableau pour stocker les heures
    let heures = [];

    // Boucle pour extraire les heures et les ajouter au nouveau tableau
    categories.forEach(dateString => {
    let date = new Date(dateString);
    let heure = date.getUTCHours(); // Utilisez getHours() pour l'heure locale
    heures.push(heure);
    console.log(heures);
});
    updateChartLineLabels(heures,temperatureData,humidityData)


    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour du graphique:', error);
    });
  }
  
  function updateChart(categories, temperatureData, humidityData) {
    // Code pour mettre à jour votre graphique avec les données
    // ...
  }
  

updateDataGraph()