// Lien pour récupérer les données pour la création de la map
const mapUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'


/*
Cette fonction crée le line chart permettant de voir l'évolution du nombre de naissance dans le temps 

_values : nombre de naissance
_years : années
*/

function createLineChart(_years, _values) {
  const ctx = document.getElementById('lineChart');

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
          label: 'Nombre de naissance',
          data: _values,
          borderWidth: 1,
        },
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display : false,
          position: 'top',
        },
        title: {
          display: true,
          text: "Evolution du nombre de naissance par année"
        }
      }
    },
  })
}

/**
Cette fonction crée le Donut Chart permettant de voir le nombre de naissance en fonction du groupe de revenu

_values : nombre de naissance
bankIncome : groupe de revenu 
*/
function createDonutChart(_values, _bankIncome) {
  const ctx = document.getElementById('doughnutChart');

  const existingChart = Chart.getChart(ctx);

  /* Supprimer le graphique si il existe afin de recréer le nouveau lorsque l'on change de filtre */
  if (existingChart) {
    existingChart.destroy();
  }

  // Création du graphique avec les paramètres donnés en entrée de la fonction
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          label: 'Nombre de naissance',
          data: _values,
          backgroundColor : ['rgb(255,0,0)','rgb(0,128,0)','rgb(173,255,47)','rgb(192,192,192)','rgb(255,165,0)'],
          borderWidth: 1,
        },
      ],
      labels: _bankIncome

    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display : false,
          position: 'top',
        },
        title: {
          display: true,
          text: "Distribution du nombre de naissance par bank income"
        }
      }
    },
  })
}


function createBarChart(_country, _values) {
  const ctx = document.getElementById('BarChartHorizontal');

  const existingChart = Chart.getChart(ctx);

  if (existingChart) {
    existingChart.destroy();
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: _country,
      datasets: [
        {
          label: 'Nombre de naissance',
          data: _values,
          borderWidth: 1,
        },
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'top',
        },
        title: {
          display: true,
          text: "Evolution du nombre de naissance par année"
        }
      }
    },
  })
}

/**
Cette fonction récupère les données relatifs aux naissances et au continent pour chaque année par année
_birth : 
_continent : nom du contient que l'on veut visualiser, par défaut vide
*/
function _getBirthsValuesByYear(_birth, _continent="") {
  const ctx = document.getElementById('lineChart');
  const spinner = createSpinner();
  ctx.parentNode.appendChild(spinner);

  // Il existe 2 fonctions pour récupérer les données, une mondiale et une relative au continent
	
	// functionToCall recupère les fonctions pour récupérer les données mondiale par année
  let functionToCall = _birth.getBirthsValuesByYear();

  // Si le continent n'est pas vide, on affecte les données relative au continent par année

  if(_continent !== "") {
    functionToCall = _birth.getBirthsValuesByYearContinent(_continent);
  }

  // On utilise la bonne fonction pour grouper les données par année

  functionToCall.then((births) => {
    const yearsGrouped = _birth.groupValueByColumn("year", births);
    const years = Object.keys(yearsGrouped);
    const values = Object.values(yearsGrouped);

    spinner.remove();
    // On crée le graphique avec les valeurs en appelant la fonction définie plus haut
    createLineChart(years, values);
  });
}

/**
Cette fonction récupère les données relatifs aux naissances et au continent
_birth : 
_continent : nom du contient que l'on veut visualiser, par défaut vide
*/
function _getBirthsByBankIncome(_birth, _continent="") {
  const ctx = document.getElementById('doughnutChart');
  const spinner = createSpinner();
  ctx.parentNode.appendChild(spinner);
  
  // Il existe 2 fonctions pour récupérer les données, une mondiale et une relative au continent
	
	// functionToCall recupère les fonctions pour récupérer les données mondiale
  let functionToCall = _birth.getBirthsByBankIncome();

  // Si le continent n'est pas vide, on affecte les données relative au continent
  if(_continent !== "") {
      functionToCall = _birth.getBirthsByBankIncomeContinent(_continent);
  }

  functionToCall.then((births) => {
    const bankIncomeGrouped = _birth.groupValueByColumn("bank_income", births);
    const bankIncome = Object.keys(bankIncomeGrouped);
    const values = Object.values(bankIncomeGrouped);

    console.log(bankIncomeGrouped);

    spinner.remove();
    createDonutChart(values, bankIncome);
  });
}

function _getBirthsByCountry(_birth, _continent="") {
  const ctx = document.getElementById('BarChartHorizontal');
  const spinner = createSpinner();
  ctx.parentNode.appendChild(spinner);
  let functionToCall = _birth.getBirthsByCountry();

  if(_continent !== "") {
      functionToCall = _birth.getBirthsByCountryContinent(_continent);
  }

  functionToCall.then((births) => {
    const countryGrouped = _birth.groupValueByColumn("country", births);

    const arrCountryGrouped = Object.entries(countryGrouped);

    /* Trier les pays de manière décroissante en fonction du nombre de naissances*/
    arrCountryGrouped.sort((a, b) => b[1] - a[1]);

    let country = arrCountryGrouped.map((item) => item[0]);
    let values = arrCountryGrouped.map((item) => item[1]);

    /* Récupérer seulement les 5 premiers pays */
    country.splice(5, country.length);
    values.splice(5, values.length);

    spinner.remove();
    createBarChart(country, values)
  });
}

function _getBirthsValues(_birth, _continent="") {
  const ctx = document.getElementById('KPI-Total');
  const spinner = createSpinner();
  ctx.parentNode.appendChild(spinner);
  let functionToCall = _birth.getBirthsValues();

  if(_continent !== "") {
      functionToCall = _birth.getBirthsValuesContinent(_continent);
  }

  functionToCall.then((births) => {
    const KPITotal = _birth.groupValues(births);
    spinner.remove();
    const ctx = document.getElementById('KPI-Total');
    ctx.textContent = KPITotal.toLocaleString(); // toLocale permet d'ajouter les séparateurs de milliers
  });
}

function _getBirthsValuesByYearKpi(_birth, _continent="") {
  const ctx = document.getElementById('KPI-AVG');
  const spinner = createSpinner();
  ctx.parentNode.appendChild(spinner);
  let functionToCall = _birth.getBirthsValuesByYear();

  if(_continent !== "") {
      functionToCall = _birth.getBirthsValuesByYearContinent(_continent);
  }

  functionToCall.then((births) => {
    const yearsGrouped = _birth.groupValueByColumn("year", births);
    const years = Object.keys(yearsGrouped);
    const values = Object.values(yearsGrouped);

    const totalBirths = values.reduce((acc, value) => acc + value, 0);
    const averageBirths = totalBirths / years.length;

    const ctx = document.getElementById('KPI-AVG');
    spinner.remove();
    const avg = Math.round(parseFloat(averageBirths));
    ctx.textContent = avg.toLocaleString(); // toLocale permet d'ajouter les séparateurs de milliers
  });
}

function createMap(_birth){
  _birth.getBirthsValues().then((totalBirths) => {
    _birth.getBirthsByCountry().then((births) => {

      // Traitez les données des naissances par pays
      const countryGrouped = _birth.groupValueByColumn("country", births);
      const countriesData = Object.entries(countryGrouped);

      const url = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'

      fetch(url).then((result) => result.json()).then((datapoint) => {
        const countries = ChartGeo.topojson.feature(datapoint, datapoint.objects.countries).features;


        const groupedTotalBirths = parseInt(_birth.groupValues(totalBirths));

        countries.forEach((country) => {
          const countryName = country.properties.name;
          const countryBirths = countriesData.find((entry) => entry[0] === countryName);

          if (countryBirths) {
            country.properties.births = countryBirths[1]; // Ajoutez la valeur des naissances au pays correspondant
          } else {
            country.properties.births = 0; // Par défaut, attribuez 0 aux pays sans données
          }
        });
        

        const data = {
          labels: countries.map(country => country.properties.name),
          datasets: [
            {
              label: "Countries",
              backgroundColor: context => {
                if (context.dataIndex == null) {
                  return null;
                }
                const value = context.dataset.data[context.dataIndex];
                return `rgb(0, 0, ${value.value * 255})`;
              },
              data: countries.map(d => ({feature: d, value: createPercent(parseInt(d.properties.births), groupedTotalBirths)}))
            }
          ]
        };


        const config = {
          type: 'choropleth',
          data,
          options: {
            showOutline: true,
            showGraticule: false,
            scales: {
              xy: {
                projection: 'equalEarth'
              }
            },
            plugins: {
              legend: {
                display: false
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
  const birth = new Birth();

  // Graphique LINE CHART
  _getBirthsValuesByYear(birth, continent);

  // Graphique DONUT Chart
  _getBirthsByBankIncome(birth, continent);

  // Graphique BAR CHART HORIZONTAL
  _getBirthsByCountry(birth, continent);

  // KPI Naissance total
  _getBirthsValues(birth, continent);

  // KPI Naissance moyenne par an
  _getBirthsValuesByYearKpi(birth, continent);

  createMap(birth);
}

function createPercent(values, total) {
  return ((values / total) * 100);
}