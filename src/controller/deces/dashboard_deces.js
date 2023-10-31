const mapUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

function createLineChart(_valuesMale, _valuesFemale, _years) {
	const ctx = document.getElementById('linechart');

	const existingChart = Chart.getChart(ctx);

	if (existingChart) {
		existingChart.destroy();
	}

	new Chart(ctx, {

		type: 'line',
		data: {
			labels: _years,
			datasets: [
				{
					label: 'Homme',
					data: _valuesMale,
					borderWidth: 1
				},
				{
					label: 'Femme',
					data: _valuesFemale,
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
}

function createBarChart(_valuesMale, _valuesFemale, _age_group) {
	const ctx = document.getElementById('barplot');

	const existingChart = Chart.getChart(ctx);

	if (existingChart) {
		existingChart.destroy();
	}

	new Chart(ctx, {

		type: 'bar',
		data: {
			labels: _age_group,
			datasets: [
				{
					label: 'Homme',
					data: _valuesMale,
					borderWidth: 1
				},
				{
					label: 'Femme',
					data: _valuesFemale,
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
}

function _getDeathsValuesMaleByYear(_death, _continent="") {
	const ctx = document.getElementById('linechart');
	const spinner = createSpinner();
	ctx.parentNode.appendChild(spinner);

	let yearsGroupedMale;
	let yearsGroupedFemale;

	let functionToCall = _death.getDeathsValuesMaleByYear().then((deaths) => {
		yearsGroupedMale = _death.groupValueByColumn("year", deaths);
		return _death.getDeathsValuesFemaleByYear();
	});

	if(_continent !== "") {
		functionToCall = _death.getDeathsValuesMaleByYearContinent(_continent).then((deaths) => {
			yearsGroupedMale = _death.groupValueByColumn("year", deaths);
			return _death.getDeathsValuesFemaleByYearContinent(_continent);
		})
	}

	functionToCall.then((deaths) => {
		yearsGroupedFemale = _death.groupValueByColumn("year", deaths);

		const years = Object.keys(yearsGroupedMale);
		const valuesMale = Object.values(yearsGroupedMale);
		const valuesFemale = Object.values(yearsGroupedFemale);

		spinner.remove();
		// LINE CHART
		createLineChart(valuesMale, valuesFemale, years);
	});
}

function _getDeathsValuesMaleByAge(_death, _continent="") {
	const ctx = document.getElementById('barplot');
	const spinner = createSpinner();
	ctx.parentNode.appendChild(spinner);
	let ageGroupedMale;
	let ageGroupedFemale;

	let functionToCall = _death.getDeathsValuesMaleByAge().then((deaths) => {
		ageGroupedMale = _death.groupValueByColumn("age_group", deaths);
		return _death.getDeathsValuesFemaleByAge();
	})

	if(_continent !== "") {
		functionToCall = _death.getDeathsValuesMaleByAgeContinent(_continent).then((deaths) => {
			ageGroupedMale = _death.groupValueByColumn("age_group", deaths);
			return _death.getDeathsValuesFemaleByAgeContinent(_continent);
		})
	}

	functionToCall.then((deaths) =>{
		ageGroupedFemale = _death.groupValueByColumn("age_group", deaths);

		const age_group = Object.keys(ageGroupedMale);
		const valuesMale = Object.values(ageGroupedMale);
		const valuesFemale = Object.values(ageGroupedFemale);

		spinner.remove();
		// BAR CHART
		createBarChart(valuesMale, valuesFemale, age_group);
	});
}

function _getDeathsValues(_death, _continent="") {
	const ctx = document.getElementById('KPI-Total');
	const spinner = createSpinner();
	ctx.parentNode.appendChild(spinner);
	let functionToCall = _death.getDeathsValues();

	if(_continent !== "") functionToCall = _death.getDeathsValuesContinent(_continent);

	functionToCall.then((deaths) => {
		const KPITotal = _death.groupValues(deaths);
		spinner.remove();
		const ctx = document.getElementById('KPI-Total');
		ctx.textContent = KPITotal.toLocaleString(); // toLocale permet d'ajouter les séparateurs de milliers
	});
}

function _getDeathsValuesFemale(_death, _continent="", ) {
	const ctx = document.getElementById('KPI-Total-Femme');
	const spinner = createSpinner();
	ctx.parentNode.appendChild(spinner);
	let functionToCall = _death.getDeathsValuesFemale();

	if(_continent !== "") functionToCall = _death.getDeathsValuesFemaleContinent(_continent);

	functionToCall.then((deaths) => {
		const KPITotal = _death.groupValues(deaths);
		spinner.remove();
		const ctx = document.getElementById('KPI-Total-Femme');
		ctx.textContent = KPITotal.toLocaleString(); // toLocale permet d'ajouter les séparateurs de milliers
	});
}

function _getDeathsValuesMale(_death, _continent="") {
	const ctx = document.getElementById('KPI-Total-Homme');
	const spinner = createSpinner();
	ctx.parentNode.appendChild(spinner);
	let functionToCall = _death.getDeathsValuesMale();

	if(_continent !== "") functionToCall = _death.getDeathsValuesMaleContinent(_continent);

	functionToCall.then((deaths) => {
		const KPITotal = _death.groupValues(deaths);
		spinner.remove();
		const ctx = document.getElementById('KPI-Total-Homme');
		ctx.textContent = KPITotal.toLocaleString(); // toLocale permet d'ajouter les séparateurs de milliers
	});
}

function createMap() {
	const ctx = document.getElementById('map');
	const spinner = createSpinner();
	ctx.parentNode.appendChild(spinner);
	fetch(mapUrl).then((result)=>result.json()).then((datapoint)=> {
		const countries = ChartGeo.topojson.feature(datapoint, datapoint.objects.countries).features;

		console.log(countries);

		const data = {
			labels : countries.map(country => country.properties.name),
			datasets : [{
				label : 'Countries',
				data : countries.map(country => ({
						feature: country,
						value : Math.random()
					})
				),
			}]
		};

		const config = {
			type: 'choropleth',
			data,
			options : {
				showOutline : true,
				showGraticule : true,
				scales : {
					xy : {
						projection : 'equalEarth'
					}
				},
				plugins : {
					legend :{
						display : false
					}
				}
			}
		};

		spinner.remove();
		const myChart = new Chart(
			document.getElementById('map'),
			config
		);

	})
}

function initializeData(continent="") {
	const death = new Death();

	// Par année
	_getDeathsValuesMaleByYear(death, continent);

	// Par Age Group
	_getDeathsValuesMaleByAge(death, continent);

	// KPI Décès total
	_getDeathsValues(death, continent);

	// KPI Décès Femmes
	_getDeathsValuesFemale(death, continent);

	// KPI Décès Hommes
	_getDeathsValuesMale(death, continent);

	// Map
	createMap();
}

