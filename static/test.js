// Supposons que votre réponse JSON est stockée dans la variable 'data'
const data = [
  { "hour": "Fri, 26 Jul 2024 08:00:00 GMT", "humidity": "34.00", "temperature": "20.00" },
  { "hour": "Fri, 26 Jul 2024 18:00:00 GMT", "humidity": "50.00", "temperature": "40.00" }
];

// Extraire les données pour Highcharts
const categories = data.map(item => item.hour);
const temperatureData = data.map(item => parseFloat(item.temperature));
const humidityData = data.map(item => parseFloat(item.humidity));

// Configuration de Highcharts
Highcharts.chart('container', {
    xAxis: {
        categories: categories
    },
    yAxis: {
        title: {
            text: 'Température (°C) et Humidité (%)'
        },
        // ... autres options de l'axe Y
    },
    legend: {
        // ...
    },
    plotOptions: {
        line: {
            // ...
        }
    },
    series: [{
        name: 'Température',
        data: temperatureData
    }, {
        name: 'Humidité',
        data: humidityData
    }]
});


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