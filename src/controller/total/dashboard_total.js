const mapUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'


/**
 * Crée un graphique linéaire pour visualiser l'évolution du solde naturel dans le temps.
 *
 * @param {Object} _birth - Données sur les naissances.
 * @param {Object} _death - Données sur les décès.
 * @param {string} [_continent=""] - Le continent à visualiser (par défaut, vide pour mondial).
 * @returns {Promise<void>} - Le graphique linéaire affichant l'évolution du solde naturel.
*/
async function createLineChart(_birth,_death, _continent="") {
	const ctx = document.getElementById('linechart');
    const spinner = createSpinner();
    ctx.parentNode.appendChild(spinner);
	const existingChart = Chart.getChart(ctx);

	// Supprimer le graphique si il existe afin de recréer le nouveau lorsque l'on change de filtre
	if (existingChart) {
		existingChart.destroy();
	}

    let functionToCallBirth = _birth.getBirthsValuesByYear()
    let functionToCallDeath = _death.getDeathsValuesByYear()

    if(_continent !== ""){
        functionToCallBirth = _birth.getBirthsValuesByYearContinent(_continent)
        functionToCallDeath = _death.getDeathsValuesByYearContinent(_continent)
    }

    try {
        const birthsByYear = await functionToCallBirth;
        const deathsByYear = await functionToCallDeath;

        const birthsGrouped = _birth.groupValueByColumn("year", birthsByYear);
        const deathsGrouped = _death.groupValueByColumn("year", deathsByYear);

        const years = Object.keys(birthsGrouped);

        const soldeNaturel = years.map((year) => {
            const births = birthsGrouped[year] || 0;
            const deaths = deathsGrouped[year] || 0;
            return births - deaths;
        });

        spinner.remove();
        // Création du graphique avec les paramètres donnés en entrée de la fonction

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Solde naturel',
                        data: soldeNaturel,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    },
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: "Evolution du solde naturel par année"
                    }
                }
            }
        });
        
    } catch (error) {
        console.error('Erreur lors de la récupération ou du traitement des données :', error);
    }

	
}

/* 
Cette fonction permet de créer le Bar chart permettant d'afficher les pays 
*/
async function createBarChart(_birth,_death, _continent="") {
	const ctx = document.getElementById('barplot');
    const spinner = createSpinner();
    ctx.parentNode.appendChild(spinner);
	const existingChart = Chart.getChart(ctx);

	// Supprimer le graphique si il existe afin de recréer le nouveau lorsque l'on change de filtre
	if (existingChart) {
		existingChart.destroy();
	}

    let functionToCallBirth = _birth.getBirthsByCountry()
    let functionToCallDeath = _death.getdeathsByCountry()

    if(_continent !== ""){
        functionToCallBirth = _birth.getBirthsByCountryContinent(_continent)
        functionToCallDeath = _death.getdeathsByCountryContinent(_continent)
    }

    try {
        const birthsByCountry = await functionToCallBirth;
        const deathsByCountry = await functionToCallDeath;
        let naturalBalanceGrouped = [];

        const birthsGrouped = _birth.groupValueByColumn("country", birthsByCountry);
        const deathsGrouped = _death.groupValueByColumn("country_name", deathsByCountry);

        const countries = Object.keys(birthsGrouped);

        console.log("countriess", countries)

        countries.map((country) => {
            const births = birthsGrouped[country] || 0;
            const deaths = deathsGrouped[country] || 0;
            naturalBalanceGrouped.push([country, births - deaths]);
        });

        /* Trier les pays de manière décroissante en fonction du nombre de naissances*/
        naturalBalanceGrouped.sort((a, b) => b[1] - a[1]);

        let country = naturalBalanceGrouped.map((item) => item[0]);
        let values = naturalBalanceGrouped.map((item) => item[1]);

        console.log("country", country)
        console.log("values", values)

        country.splice(10, country.length);
        values.splice(10, values.length);

        spinner.remove();

        // Création du graphique avec les paramètres donnés en entrée de la fonction

        new Chart(ctx, {
            
            type: 'bar',
            data: {
                labels: country,
                datasets: [
                    {
                        label: 'Solde naturel',
                        data: values,
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
        
    } catch (error) {
        console.error('Erreur lors de la récupération ou du traitement des données :', error);
    }

	
}



/*
Cette fonction récupère les données relatifs aux décès et au continent pour le KPI décès total
_death : données décès
_birth : données naissances
_continent : nom du contient que l'on veut visualiser, par défaut vide
*/

function _getKPIValues(_death, _birth,_continent="") {

	const ctx = document.getElementById('KPI-Total-Naissances');
    const ctx2 = document.getElementById('KPI-Total-Deces');
    const ctxSolde = document.getElementById('KPI-Solde-Naturel');
	const spinner = createSpinner();
    const spinner2 = createSpinner();
    const spinnerSolde = createSpinner();
	ctx.parentNode.appendChild(spinner);
    ctx2.parentNode.appendChild(spinner2);
    ctxSolde.parentNode.appendChild(spinnerSolde);

	// Il existe 2 fonctions pour récupérer les données, une mondiale et une relative au continent
	
	// functionToCall recupère les fonctions pour récupérer les données mondiale
	let functionToCall = _birth.getBirthsValues().then((births) => {

            // KPI NAISSANCES
            KPITotalBirth = _birth.groupValues(births);
            spinner.remove();
            const ctx = document.getElementById('KPI-Total-Naissances');
            ctx.textContent = KPITotalBirth.toLocaleString();

        }).then(() => {
            return _death.getDeathsValues();
        })

	// Si le continent n'est pas vide, on affecte les données relative au continent
	if(_continent !== "") {
            functionToCall = _birth.getBirthsValuesContinent(_continent).then((births) => {

            // KPI NAISSANCES
            KPITotalBirth = _birth.groupValues(births);
            spinner.remove();
            const ctx = document.getElementById('KPI-Total-Naissances');
            ctx.textContent = KPITotalBirth.toLocaleString();

        }).then(() => {
            return _death.getDeathsValuesContinent(_continent);
        })
    }

    // KPIs
    let KPITotalBirth, KPITotalDeath;
    
    functionToCall.then((deaths) => {
    
        // KPI DECES
        KPITotalDeath = _death.groupValues(deaths);
        spinner2.remove();
        const ctx = document.getElementById('KPI-Total-Deces');
        ctx.textContent = KPITotalDeath.toLocaleString();

        // KPI SOLDE NATUREL
        const KPISolde = KPITotalBirth - KPITotalDeath;
        spinnerSolde.remove();
        const ctxSolde = document.getElementById('KPI-Solde-Naturel');
        ctxSolde.textContent = KPISolde.toLocaleString();

    }).catch((error) => {
        // Gestion d'erreur
        console.error('Erreur lors de la récupération des données :', error);
    });
}

function createMap(_birth, _death) {
    const url = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'

    _birth.getBirthsByCountry().then((totalBirths) => {
        const birthsCountryGrouped = _birth.groupValueByColumn("country", totalBirths);
        const birthsCountriesData = Object.keys(birthsCountryGrouped);

        _death.getdeathsByCountry().then((totalDeaths) => {
            const deathsCountryGrouped = _death.groupValueByColumn("country_name", totalDeaths);
            const deathsCountriesData = Object.keys(deathsCountryGrouped);

            fetch(url).then((result)=>result.json()).then((datapoint)=> {
                const countries = ChartGeo.topojson.feature(datapoint, datapoint.objects.countries).features;


                const totalNaturalBalance = parseInt(_birth.groupValues(totalBirths)) - parseInt(_death.groupValues(totalDeaths));

                console.log(countries);

                countries.forEach((country) => {
                    const countryName = country.properties.name;

                    if(birthsCountriesData.includes(countryName) && deathsCountriesData.includes(countryName)){
                        const births = parseInt(birthsCountryGrouped[countryName]) || 0;
                        const deaths = parseInt(deathsCountryGrouped[countryName]) || 0;

                        const naturalBalance = births - deaths;

                        country.properties.value = parseInt(naturalBalance);
                    } else {
                        country.properties.value = 0;
                    }

                });

                const data = {
                    labels : countries.map(country => country.properties.name),
                    datasets : [{
                        label : 'Countries',
                        backgroundColor: context => {
                            if (context.dataIndex == null) {
                                return null;
                            }
                            const value = context.dataset.data[context.dataIndex];
                            return `rgb(0, 0, ${value.value * 255})`;
                        },
                        data : countries.map(country => ({
                                feature: country,
                                value : country.properties.value
                            })
                        ),
                    }]
                };


                const config = {
                    type: 'choropleth',
                    data,
                    options : {
                        showOutline : true,
                        showGraticule : false,
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

                const myChart = new Chart(
                    document.getElementById('map'),
                    config
                );

            })
        });
    });
}

function initializeData(continent="") {
	const death = new Death();
    const birth = new Birth();

    // Affichage des KPIs
	_getKPIValues(death,birth,continent)

    // Affichage du Line Chart
    createLineChart(birth,death,continent)

    // Affichage du Bar Chart
    createBarChart(birth,death,continent)

    // Affichage de la map
    createMap(birth,death)
}

function createPercent(value, total) {
    return (value / total);
}