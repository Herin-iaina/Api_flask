// let lineLabels =
function updateChartLineLabels(categories, temperatureData, humidityData) {
    Highcharts.chart('line-labels', {
        chart: {
            type: 'spline',
            color : '#FFF',
            backgroundColor : 'rgba(41,46,51,1)', // '#303233',
            ColorString : '#FFF',
            // height: 500
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
            className: 'highcharts-color-1',
            categories: categories,
            accessibility: {
                description: 'Months of the year'
            },
        },
        yAxis: {
            className: 'highcharts-color-0',

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
            },
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


// --------Temp--------------
const gaugeOptions = {
    chart: {
        type: 'solidgauge',
        backgroundColor : 'rgba(41,46,51,1)',
        height: 200,
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '100%',
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

    // setSize(100, 100, false),\

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
            url: '/WeatherData', 
            type: 'GET',
            headers : {
                        "X-API-KEY": "votre_cle_api_1"
                        },
            success: (response) => {
                // console.log(response);
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
        const temperature = (data.temperature)  ? parseInt(data.temperature) : 0;
        const humidity = (data.humidity) ? parseInt(data.humidity) : 0;
        const average_temperature = (data.average_temperature) ?  parseInt(data.average_temperature) : 0;
        const average_humidity = (data.average_humidity) ?  parseInt(data.average_humidity) : 0;
        // console.log(typeof temperature);
        // console.log(typeof humidity);
        // console.log(typeof average_temperature);
        // console.log(typeof average_humidity);

        if (!isNaN(temperature) && !isNaN(humidity) &&
            !isNaN(average_temperature) && !isNaN(average_humidity)) {

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
                    data: [average_temperature],
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
                    data: [average_humidity],
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
                    data: [temperature],
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
                    data: [humidity],
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

updateData();
// setInterval(updateData, 2000);



// Fonction pour faire la requête GET à l'API
function fetchWeatherDataList() {
    return fetch('/WeatherDF', {
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
    fetchWeatherDataList()
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
    // console.log(categories);
    // console.log(temperatureData);
    // console.log(humidityData);
    // Nouveau tableau pour stocker les heures
    let heures = [];

    // Boucle pour extraire les heures et les ajouter au nouveau tableau
    categories.forEach(dateString => {
    let date = new Date(dateString);
    // let heure = date.getUTCHours(); // Utilisez getHours() pour l'heure locale
    // let fheure = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    let fheure = date.toISOString().substring(11, 16);
    heures.push(fheure);
    // console.log(heures);
    // console.log(fheure)
});
    updateChartLineLabels(heures,temperatureData,humidityData)


    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour du graphique:', error);
    });
  }
  
updateDataGraph()