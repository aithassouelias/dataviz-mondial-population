window.addEventListener('load', () => {
	const death = new Death();

	// Par année
	let yearsGroupedMale, yearsGroupedFemale;

	death.getDeathsValuesMaleByYearContinent('Asia').then((deaths) => {
		yearsGroupedMale = death.groupValueByColumn("year", deaths);
		return death.getDeathsValuesFemaleByYearContinent('Asia');
	}).then((deaths) =>{
		yearsGroupedFemale = death.groupValueByColumn("year", deaths);

		const years = Object.keys(yearsGroupedMale);
		const valuesMale = Object.values(yearsGroupedMale);
		const valuesFemale = Object.values(yearsGroupedFemale);

		// LINE CHART

		const ctx1 = document.getElementById('linechart');

		new Chart(ctx1, {
			
			type: 'line',
			data: {
				labels: years,
				datasets: [
					{
						label: 'Homme',
						data: valuesMale,
						borderWidth: 1
					},
					{
						label: 'Femme',
						data: valuesFemale,
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
						text : "Évolution du nombre de décès par année en fonction du sexe"
					}
				}
			}
		});


	});

	// Par Age Group

	let ageGroupedMale, ageGroupedFemale;

	death.getDeathsValuesMaleByAgeContinent('Asia').then((deaths) => {
		ageGroupedMale = death.groupValueByColumn("age_group", deaths);
		return death.getDeathsValuesFemaleByAgeContinent('Asia');
	}).then((deaths) =>{
		ageGroupedFemale = death.groupValueByColumn("age_group", deaths);

		const age_group = Object.keys(ageGroupedMale);
		const valuesMale = Object.values(ageGroupedMale);
		const valuesFemale = Object.values(ageGroupedFemale);

		// BAR CHART

		const ctx2 = document.getElementById('barplot');

		new Chart(ctx2, {
			
			type: 'bar',
			data: {
				labels: age_group,
				datasets: [
					{
						label: 'Homme',
						data: valuesMale,
						borderWidth: 1
					},
					{
						label: 'Femme',
						data: valuesFemale,
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

	// KPI Décès total

	death.getDeathsValuesContinent('Asia').then((deaths) => {
    
		const KPITotal = death.groupValues(deaths);
		
		const ctx = document.getElementById('KPI-Total');
	
		ctx.textContent = KPITotal.toLocaleString(); // toLocale permet d'ajouter les séparateurs de milliers
		
	});

	// KPI Décès Femmes

	death.getDeathsValuesFemaleContinent('Asia').then((deaths) => {
    
		const KPITotal = death.groupValues(deaths);
		
		const ctx = document.getElementById('KPI-Total-Femme');
	
		ctx.textContent = KPITotal.toLocaleString(); // toLocale permet d'ajouter les séparateurs de milliers
		
	});

	// KPI Décès Hommes

	death.getDeathsValuesMaleContinent('Asia').then((deaths) => {
    
		const KPITotal = death.groupValues(deaths);
		
		const ctx = document.getElementById('KPI-Total-Homme');
	
		ctx.textContent = KPITotal.toLocaleString(); // toLocale permet d'ajouter les séparateurs de milliers
		
	});
	
});