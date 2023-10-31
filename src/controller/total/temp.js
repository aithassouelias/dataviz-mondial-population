window.addEventListener('load', async () => {
    const birth = new Birth();
    const death = new Death(); 
    
    try {
        const birthsByYear = await birth.getBirthsValuesByYear();
        const deathsByYear = await death.getDeathsValuesByYear();

        const birthsGrouped = birth.groupValueByColumn("year", birthsByYear);
        const deathsGrouped = death.groupValueByColumn("year", deathsByYear);

        const years = Object.keys(birthsGrouped);

        const soldeNaturel = years.map((year) => {
            const births = birthsGrouped[year] || 0;
            const deaths = deathsGrouped[year] || 0;
            return births - deaths;
        });

        // Création du graphique ici
    } catch (error) {
        console.error('Erreur lors de la récupération ou du traitement des données :', error);
    }

    /*
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
                    display : false,
                    position : 'top',
                },
                title : {
                    display : true,
                    text : "Les 10 pays avec les soldes naturels les plus importants"
            }
            }
        }
	});
    */



});