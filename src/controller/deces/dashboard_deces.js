// Lien pour récupérer les données pour la création de la map
const mapUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

/*
Cette fonction crée le line chart permettant de voir l'évolution du nombre de décès dans le temps en fonction du sexe

_valuesMale : nombre de décès homme
_valuesFemale : nombre de décès femme
_years : années
*/
function createLineChart(_valuesMale, _valuesFemale, _years) {
	const ctx = document.getElementById('linechart');

	const existingChart = Chart.getChart(ctx);

	// Supprimer le graphique si il existe afin de recréer le nouveau lorsque l'on change de filtre
	if (existingChart) {
		existingChart.destroy();
	}

	// Création du graphique avec les paramètres donnés en entrée de la fonction

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

/*
Cette fonction crée le bar chart permettant de voir le nombre de décès en fonction du sexe et de la tranche d'âge

_valuesMale : nombre de décès homme
_valuesFemale : nombre de décès femme
_age_group : tranches d'âge
*/

function createBarChart(_valuesMale, _valuesFemale, _age_group) {
	const ctx = document.getElementById('barplot');

	const existingChart = Chart.getChart(ctx);
	
	/* Supprimer le graphique si il existe afin de recréer le nouveau lorsque l'on change de filtre */
	if (existingChart) {
		existingChart.destroy();
	}

	// Création du graphique avec les paramètres donnés en entrée de la fonction
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
					text : "Le nombre de décès en fonction du sexe et de la tranche d'âge"
				}
			}
		}
	});
}

/*
Cette fonction récupère les données relatifs aux décès et au continent pour chaque année
_death : 
_continent : nom du contient que l'on veut visualiser, par défaut vide
*/
function _getDeathsValuesMaleByYear(_death, _continent="") {
	const ctx = document.getElementById('linechart');
	const spinner = createSpinner();
	ctx.parentNode.appendChild(spinner);

	// Variable permettant de récupérer les données groupées par année pour les hommes et femmes
	let yearsGroupedMale;
	let yearsGroupedFemale;

	
	// Il existe 2 fonctions pour récupérer les données, une mondiale et une relative au continent
	
	// functionToCall recupère les fonctions pour récupérer les données mondiale
	let functionToCall = _death.getDeathsValuesMaleByYear().then((deaths) => {
		yearsGroupedMale = _death.groupValueByColumn("year", deaths);
		return _death.getDeathsValuesFemaleByYear();
	});

	// Si le continent n'est pas vide, on affecte les données relative au continent

	if(_continent !== "") {
		functionToCall = _death.getDeathsValuesMaleByYearContinent(_continent).then((deaths) => {
			yearsGroupedMale = _death.groupValueByColumn("year", deaths);
			return _death.getDeathsValuesFemaleByYearContinent(_continent);
		})
	}

	// On utilise la bonne fonction pour grouper les données par année

	functionToCall.then((deaths) => {
		yearsGroupedFemale = _death.groupValueByColumn("year", deaths);

		const years = Object.keys(yearsGroupedMale);
		const valuesMale = Object.values(yearsGroupedMale);
		const valuesFemale = Object.values(yearsGroupedFemale);

		spinner.remove();

		// On crée le graphique avec les valeurs en appelant la fonction définie plus haut
		createLineChart(valuesMale, valuesFemale, years);
	});
}

/*
Cette fonction récupère les données relatifs aux décès et au continent par âge
_death : 
_continent : nom du contient que l'on veut visualiser, par défaut vide
*/

function _getDeathsValuesMaleByAge(_death, _continent="") {
	const ctx = document.getElementById('barplot');
	const spinner = createSpinner();
	ctx.parentNode.appendChild(spinner);

	// Variable permettant de récupérer les données groupées par tranche d'âge pour les hommes et femmes
	let ageGroupedMale;
	let ageGroupedFemale;

	// Il existe 2 fonctions pour récupérer les données, une mondiale et une relative au continent
	
	// functionToCall recupère les fonctions pour récupérer les données mondiale

	let functionToCall = _death.getDeathsValuesMaleByAge().then((deaths) => {
		ageGroupedMale = _death.groupValueByColumn("age_group", deaths);
		return _death.getDeathsValuesFemaleByAge();
	})

	// Si le continent n'est pas vide, on affecte les données relative au continent
	if(_continent !== "") {
		functionToCall = _death.getDeathsValuesMaleByAgeContinent(_continent).then((deaths) => {
			ageGroupedMale = _death.groupValueByColumn("age_group", deaths);
			return _death.getDeathsValuesFemaleByAgeContinent(_continent);
		})
	}

	// On utilise la bonne fonction pour grouper les données par tranche d'âge

	functionToCall.then((deaths) =>{
		ageGroupedFemale = _death.groupValueByColumn("age_group", deaths);

		const age_group = Object.keys(ageGroupedMale);
		const valuesMale = Object.values(ageGroupedMale);
		const valuesFemale = Object.values(ageGroupedFemale);

		spinner.remove();
		// On crée le graphique avec les valeurs en appelant la fonction définie plus haut
		createBarChart(valuesMale, valuesFemale, age_group);
	});
}

/*
Cette fonction récupère les données relatifs aux décès et au continent pour le KPI décès total
_death : 
_continent : nom du contient que l'on veut visualiser, par défaut vide
*/

function _getDeathsValues(_death, _continent="") {

	const ctx = document.getElementById('KPI-Total');
	const spinner = createSpinner();
	ctx.parentNode.appendChild(spinner);

	// Il existe 2 fonctions pour récupérer les données, une mondiale et une relative au continent
	
	// functionToCall recupère les fonctions pour récupérer les données mondiale
	let functionToCall = _death.getDeathsValues();

	// Si le continent n'est pas vide, on affecte les données relative au continent
	if(_continent !== "") functionToCall = _death.getDeathsValuesContinent(_continent);

	// On affiche les données sur le KPI
	functionToCall.then((deaths) => {
		const KPITotal = _death.groupValues(deaths);
		spinner.remove();
		const ctx = document.getElementById('KPI-Total');
		ctx.textContent = KPITotal.toLocaleString(); // toLocale permet d'ajouter les séparateurs de milliers
	});
}

/*
Cette fonction récupère les données relatifs aux décès et au continent pour le KPI décès femme
_death : 
_continent : nom du contient que l'on veut visualiser, par défaut vide
*/

function _getDeathsValuesFemale(_death, _continent="", ) {
	const ctx = document.getElementById('KPI-Total-Femme');
	const spinner = createSpinner();
	ctx.parentNode.appendChild(spinner);

	// Il existe 2 fonctions pour récupérer les données, une mondiale et une relative au continent
	
	// functionToCall recupère les fonctions pour récupérer les données mondiale

	let functionToCall = _death.getDeathsValuesFemale();

	// Si le continent n'est pas vide, on affecte les données relative au continent
	if(_continent !== "") functionToCall = _death.getDeathsValuesFemaleContinent(_continent);

	// On affiche les données sur le KPI femme
	functionToCall.then((deaths) => {
		const KPITotal = _death.groupValues(deaths);
		spinner.remove();
		const ctx = document.getElementById('KPI-Total-Femme');
		ctx.textContent = KPITotal.toLocaleString(); // toLocale permet d'ajouter les séparateurs de milliers
	});
}

/*
Cette fonction récupère les données relatifs aux décès et au continent pour le KPI décès homme
_death : 
_continent : nom du contient que l'on veut visualiser, par défaut vide
*/
function _getDeathsValuesMale(_death, _continent="") {
	const ctx = document.getElementById('KPI-Total-Homme');
	const spinner = createSpinner();
	ctx.parentNode.appendChild(spinner);

	// Il existe 2 fonctions pour récupérer les données, une mondiale et une relative au continent
	
	// functionToCall recupère les fonctions pour récupérer les données mondiale
	let functionToCall = _death.getDeathsValuesMale();

	// Si le continent n'est pas vide, on affecte les données relative au continent
	if(_continent !== "") functionToCall = _death.getDeathsValuesMaleContinent(_continent);

	// On affiche les données sur le KPI homme
	functionToCall.then((deaths) => {
		const KPITotal = _death.groupValues(deaths);
		spinner.remove();
		const ctx = document.getElementById('KPI-Total-Homme');
		ctx.textContent = KPITotal.toLocaleString(); // toLocale permet d'ajouter les séparateurs de milliers
	});
}

/*
Fonction permettant de créer et d'afficher la map
*/
function createMap() {

	const ctx = document.getElementById('map');
	const spinner = createSpinner();
	ctx.parentNode.appendChild(spinner);

	fetch(mapUrl).then((result)=>result.json()).then((datapoint)=> {
		const countries = ChartGeo.topojson.feature(datapoint, datapoint.objects.countries).features;

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

