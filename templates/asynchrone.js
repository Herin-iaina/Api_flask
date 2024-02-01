// Créez le graphique
let chart = Highcharts.chart('container', {
    series: [{
        data: [] // Les données initiales sont vides
    }]
});

// Fonction pour récupérer et mettre à jour les données
function updateData() {
    fetch('url_du_service_web')
        .then(response => response.json())
        .then(data => {
            // Mettez à jour les données du graphique
            chart.series[0].setData(data);
        })
        .catch(error => console.error('Erreur:', error));
}

// Appelez la fonction updateData à intervalles réguliers
setInterval(updateData, 5000); // Met à jour toutes les 5 secondes
