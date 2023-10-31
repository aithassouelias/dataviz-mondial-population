const mapUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'


/*
Cette fonction crée le line chart permettant de voir l'évolution du nombre de décès dans le temps en fonction du sexe

_valuesMale : solde naturel homme
_valuesFemale : solde naturel femme
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
}





/*
Cette fonction récupère les données relatifs aux décès et au continent pour le KPI décès total
_death : 
_continent : nom du contient que l'on veut visualiser, par défaut vide
*/

function _getKPIValues(_death, _birth,_continent="") {

	const ctx = document.getElementById('KPI-Total-Naissances');
	const spinner = createSpinner();
	ctx.parentNode.appendChild(spinner);

	// Il existe 2 fonctions pour récupérer les données, une mondiale et une relative au continent
	
	// functionToCall recupère les fonctions pour récupérer les données mondiale
	let functionToCall = _birth.getBirthsValues().then((births) => {

            // KPI NAISSANCES
            KPITotalBirth = birth.groupValues(births);
            const ctx = document.getElementById('KPI-Total-Naissances');
            ctx.textContent = KPITotalBirth.toLocaleString();

        }).then(() => {
            return _death.getDeathsValues();
        })

	// Si le continent n'est pas vide, on affecte les données relative au continent
	if(_continent !== "") {
            functionToCall = _birth.getBirthsValuesContinent(_continent).then((births) => {

            // KPI NAISSANCES
            KPITotalBirth = birth.groupValues(births);
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
        const ctx = document.getElementById('KPI-Total-Deces');
        ctx.textContent = KPITotalDeath.toLocaleString();

        // KPI SOLDE NATUREL
        const KPISolde = KPITotalBirth - KPITotalDeath;
        const ctxSolde = document.getElementById('KPI-Solde-Naturel');
        ctxSolde.textContent = KPISolde.toLocaleString();

    }).catch((error) => {
        // Gestion d'erreur
        console.error('Erreur lors de la récupération des données :', error);
    });
}


function initializeData(continent="") {
	const death = new Death();
    const birth = new Birth();

	_getKPIValues(death,birth,continent)

}