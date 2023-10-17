window.addEventListener('load', () => {

    const ctx = document.getElementById('barplot');

    new Chart(ctx, {
        
		type: 'bar',
		data: {
			labels: ['[5-9] ans', '[10-14] ans', '[15-19] ans', '[20-24] ans', '[25-29] ans', '[30-34] ans', '[35-39] ans'],
			datasets: [
                {
				    label: 'Homme',
				    data: [6000, 10000, 4000, 10000, 9000, 10500, 6000, 1000, 800],
				    borderWidth: 1
			    },
                {
				    label: 'Femme',
				    data: [4000, 8000, 7000, 9000, 5000, 7000, 7500, 5500, 3000],
				    borderWidth: 1
			    }
            ]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				},
            },
            responsive : true,
            plugins : {
                legend : {
                    position : 'top',
                },
                title : {
                    display : true,
                    text : "Le nombre de décès en fonction du sexe et de la trache d'âge"
            }
            }
        }
	});

});