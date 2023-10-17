window.addEventListener('load', () => {

    const ctx = document.getElementById('linechart');

    new Chart(ctx, {
        
		type: 'line',
		data: {
			labels: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
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
                    text : "L'évolution du nombre de décès par année en fonction du sexe"
            	}
            }
        }
	});

});