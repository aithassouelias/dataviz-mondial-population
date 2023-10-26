// LINE CHART

window.addEventListener('load', () => {
  
  const ctx = document.getElementById('lineChart');

	new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['2009','2010','2011','2012','2013','2014','2015','2016','2017'],
			datasets: [
        {
				  label: 'Nombre de naissance',
				  data: [3000,11000,3000,10500,9000,12000,5000,2500,6500],
          borderWidth: 1,
				},
      ]
		},
    options: {
      responsive: true,
      plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Evolution du nombre de naissance par année"
      }
      }
    },
  })
  
  const ctx1 = document.getElementById('doughnutChart');
  new Chart(ctx1, {
		type: 'doughnut',
		data: {
			labels: ['Low Income','Lower middle Income','Upper middle Income','High Income'],
			datasets:[
        {
          data: [12000,10000,2000,8000],
          borderWidth: 1,
				}
      ]
		},
    options: {
      responsive: true,
      plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Evolution du nombre de naissance par année"
      }
      }
    },
    
  })
  const ctx2 = document.getElementById('BarChartHorizontal');

	new Chart(ctx2, {
		type: 'bar',
		data: {
		labels: ['Algeria','Morocco','France','United States of America','Ivory Cost'],
		datasets: [
      {
      label: 'Nombre de naissance',
      data: [90,85,80,75,70],
      borderWidth: 1,
			},
    ]
		},
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
      legend: {
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