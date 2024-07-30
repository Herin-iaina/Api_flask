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



    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Results</title>
</head>
<body>
    <div id="table-container"></div>

    <script>
        // Simulated JSON data (replace with actual API response)
        const apiData = [
            ["1", "Mon, 29 Jul 2024 08:48:00 GMT", "20.0000000000000000", "34.0000000000000000", "34.0000000000000000", "40.0000000000000000", "2.0000000000000000"],
            ["1", "Mon, 29 Jul 2024 18:48:00 GMT", "40.0000000000000000", "50.0000000000000000", "35.0000000000000000", "39.0000000000000000", null]
        ];

        // Create the table
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // Create table headers
        const headers = ["ID", "Date", "Value 1", "Value 2", "Value 3", "Value 4", "Value 5"];
        const headerRow = document.createElement("tr");
        headers.forEach(headerText => {
            const th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Populate table rows
        apiData.forEach(rowData => {
            const row = document.createElement("tr");
            rowData.forEach(cellData => {
                const cell = document.createElement("td");
                cell.textContent = cellData !== null ? cellData : "N/A";
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });

        table.appendChild(tbody);

        // Append the table to the container
        const tableContainer = document.getElementById("table-container");
        tableContainer.appendChild(table);
    </script>
</body>
</html>
