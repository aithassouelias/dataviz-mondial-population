window.addEventListener('load', () => {
    const birth = new Birth();
  
    // Graphique LINE CHART
    birth.getBirthsValuesByYearContinent('America').then((births) => {
      const yearsGrouped = birth.groupValueByColumn("year", births);
      const years = Object.keys(yearsGrouped);
      const values = Object.values(yearsGrouped);
  
      const ctx = document.getElementById('lineChart');
  
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: years,
          datasets: [
            {
              label: 'Nombre de naissance',
              data: values,
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
    });
  
  
    // Graphique DONUT Chart
    birth.getBirthsByBankIncomeContinent('America').then((births) => {
      const bankIncomeGrouped = birth.groupValueByColumn("bank_income", births);
      const bankIncome = Object.keys(bankIncomeGrouped);
      const values = Object.values(bankIncomeGrouped);
      
      console.log(bankIncomeGrouped);
      const ctx = document.getElementById('doughnutChart');
  
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              label: 'Nombre de naissance',
              data: values,
              backgroundColor : ['rgb(255,0,0)','rgb(0,128,0)','rgb(173,255,47)','rgb(192,192,192)','rgb(255,165,0)'],
              borderWidth: 1,
            },
          ],
          labels: bankIncome
          
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
    });
  
    // Graphique BAR CHART HORIZONTAL
  
    birth.getBirthsByCountryContinent('America').then((births) => {
      const countryGrouped = birth.groupValueByColumn("country", births);
  
      const arrCountryGrouped = Object.entries(countryGrouped);
  
      /* Trier les pays de manière décroissante en fonction du nombre de naissances*/
      arrCountryGrouped.sort((a, b) => b[1] - a[1]);
      
  
      let country = arrCountryGrouped.map((item) => item[0]);
      let values = arrCountryGrouped.map((item) => item[1]);
  
      /* Récupérer seulement les 5 premiers pays */
      country.splice(5, country.length);
      values.splice(5, values.length);
      
  
      const ctx = document.getElementById('BarChartHorizontal');
  
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: country,
          datasets: [
            {
              label: 'Nombre de naissance',
              data: values,
              borderWidth: 1,
            },
          ]
        },
        options: {
          indexAxis: 'y',
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
    });
  
    // KPI Naissance total
  
    birth.getBirthsValuesContinent('America').then((births) => {
      
      const KPITotal = birth.groupValues(births);
      
      const ctx = document.getElementById('KPI-Total');
  
      ctx.textContent = KPITotal.toLocaleString(); // toLocale permet d'ajouter les séparateurs de milliers
      
    });
  
  
    // KPI Naissance moyenne par an
  
    birth.getBirthsValuesByYearContinent('America').then((births) => {
      const yearsGrouped = birth.groupValueByColumn("year", births);
      const years = Object.keys(yearsGrouped);
      const values = Object.values(yearsGrouped);
  
      const totalBirths = values.reduce((acc, value) => acc + value, 0);
      const averageBirths = totalBirths / years.length;
      
      const ctx = document.getElementById('KPI-AVG');
      const avg = Math.round(parseFloat(averageBirths));
      ctx.textContent = avg.toLocaleString(); // toLocale permet d'ajouter les séparateurs de milliers
  
    });
  
  });