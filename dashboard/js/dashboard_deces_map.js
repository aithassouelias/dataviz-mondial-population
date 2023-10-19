fetch('https://unpkg.com/world-atlas@2.0.2/countries-50m.json').then((r) => r.json()).then((data) => { 
    const countries = ChartGeo.topojson.feature(data, data.objects.countries).features;

    const chart = document.getElementById("worldMap").getContext("2d");

    new Chart(chart, {
      type: 'choropleth',
      data: {
        labels: countries.map((d) => d.properties.name),
        datasets: [{
          label: 'Countries',
          data: countries.map((d) => ({feature: d, value: Math.random()})),
        }]
      },
      options: { 
        showOutline: true,
        showGraticule: true,
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          xy : {
            projection: {
              projection: 'equalEarth'
            }
          }
        }
      }
    });
});