

// let lineLabels =
 Highcharts.chart('line-labels', {
        chart: {
            type: 'line',
            color : '#FFF',
            backgroundColor : '#303233',
            ColorString : '#FFF'
        },
        title: {
            text: 'Monthly Average Temperature',
            style: {
                color: '#FFF',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Source: ' +
                '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
                'target="_blank">Wikipedia.com</a>',
                style: {
                    color: '#FFF',
                    fontWeight: 'lighter'
                }
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)',
                style: {
                color: '#FFF',
                fontWeight: 'lighter',
                }
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
            name: 'Reggane',
            data: [16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2,
                22.0, 17.8]
        }, {
            name: 'Tallinn',
            data: [-2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5,
                2.0, -0.9]
        }]
        
    });

//     // Fonction pour récupérer et mettre à jour les données
// function updateDatalineLabels() {
//     fetch('url_du_service_web')
//         .then(response => response.json())
//         .then(data => {
//             // Mettez à jour les données du graphique
//             chart.series[0].setData(data);
//         })
//         .catch(error => console.error('Erreur:', error));
// }

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

// The temperature gauge

// const chartTemperature = Highcharts.chart('Average-temp', Highcharts.merge(gaugeOptions, {
//     yAxis: {
//         min: 0,
//         max: 60,
//         title: {
//             text: 'Average temperature'
//         }
//     },

//     credits: {
//         enabled: false
//     },

//     series: [{
//         name: '°C',
//         data: [37.5],
//         dataLabels: {
//             format:
//                 '<div style="text-align:center">' +
//                 '<span style="font-size:25px">{y}</span><br/>' +
//                 '<span style="font-size:12px;opacity:0.4"> °C </span>' +
//                 '</div>'
//         },
//         tooltip: {
//             valueSuffix: ' °C '
//         }
//     }]

// }));

let maRequete = $.ajax({
    url: '/apps/internal_function.get_all_data',
    type: 'POST'
});

maRequete.then(
    function(response) { // Fonction de succès
        console.log(response.resultat);
        let dataValue = 37.5; // Valeur par défaut
        if (response.resultat.data) {
            dataValue = response.resultat.data;
        }

        const chartMaxTemp = Highcharts.chart('Max-Temp', Highcharts.merge(gaugeOptions, {
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
                name: 'Max temp',
                data: [dataValue],
                dataLabels: {
                    format:
                        '<div style="text-align:center">' +
                        '<span style="font-size:25px">{y}</span><br/>' +
                        '<span style="font-size:12px;opacity:0.4"> °C </span>' +
                        '</div>'
                },
                tooltip: {
                    valueSuffix: '°C'
                }
            }]
        }));
    },
    function(error) { // Fonction d'erreur
        console.log(error);
    }
);


// ----------------




//  --------- humidity ---------

// The temperature gauge
const charthumidity = Highcharts.chart('Average-Humid', Highcharts.merge(gaugeOptions, {
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
        data: [30],
        dataLabels: {
            format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4"> % </span>' +
                '</div>'
        },
        tooltip: {
            valueSuffix: '%'
        }
    }]

}));
// ----------------------------

//  --------- Max temp ---------

// The temperature gauge
const chartMaxTemp = Highcharts.chart('Max-Temp', Highcharts.merge(gaugeOptions, {
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
        name: 'Max temp',
        data: [37.5],
        dataLabels: {
            format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4"> °C </span>' +
                '</div>'
        },
        tooltip: {
            valueSuffix: '°C'
        }
    }]

}));
// ----------------------------
//--------------------MAx humidity---------------
// The temperature gauge
const chartMaxHumidity = Highcharts.chart('Max-Humid', Highcharts.merge(gaugeOptions, {
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
        data: [30],
        dataLabels: {
            format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4"> % </span>' +
                '</div>'
        },
        tooltip: {
            valueSuffix: '%'
        }
    }]

}));


// /* <script type="text/javascript"> */
// // Data retrieved https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature
// import Highcharts from 'highcharts';
// import highchartsmore from 'highcharts/highcharts-more';
// import solidgauge from 'highcharts/modules/solid-gauge';
// import exporting from 'highcharts/modules/exporting';
// import exportData from 'highcharts/modules/export-data';
// import accessibility from 'highcharts/modules/accessibility';

// highchartsmore(Highcharts);
// solidgauge(Highcharts);
// exporting(Highcharts);
// exportData(Highcharts);
// accessibility(Highcharts);