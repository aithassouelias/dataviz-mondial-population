window.addEventListener('load', () => {

    const ctx1 = document.getElementById('linechart');

    new Chart(ctx1, {
        
		type: 'line',
		data: {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
                {
				    label: 'Solde naturel',
				    data: [65, 60, 80, 82, 56, 55, 40],
				    borderWidth: 1
			    },
            ]
		},
		options: {
			scales: {
				y: {
					beginAtZero: false
				},
            },
            responsive : true,
            plugins : {
                legend : {
                    position : 'top',
                },
                title : {
                    display : true,
                    text : "L'évolution du solde naturel"
            	}
            }
        }
	});

});

///

window.addEventListener('load', () => {

    const ctx2 = document.getElementById('barplot');

    new Chart(ctx2, {
        
		type: 'bar',
		data: {
			labels: ['United States', 'France', 'China', 'Japan', 'Morocco', 'Algeria', 'Belgium'],
			datasets: [
                {
				    label: 'Solde naturel',
				    data: [100000, 90000, 80000, 60000, 40000, 20500, 15000, 13000,10000],
				    borderWidth: 1
			    },
            ]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				},
            },
            responsive : true,
            indexAxis :'y',
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