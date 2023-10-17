fetch('https://unpkg.com/world-atlas/countries-110m.json').then((r) => r.json()).then((data) => {
      const countries = ChartGeo.topojson.feature(data, data.objects.countries).features;

  const chart = new Chart(document.getElementById("canvas").getContext("2d"), {
    type: 'choropleth',
    data: {
      labels: countries.map((d) => d.properties.name),
      datasets: [{
        label: 'Countries',
        data: countries.map((d) => ({feature: d, value: Math.random()})),
      }]
    },
    options: {
      showOutline: false,
      showGraticule: false,
      plugins: {
        legend: {
          display: false
        },
      },
      scales: {
        projection: {
          axis: 'x',
          projection: 'equalEarth'
        }
      }
    }
  });
});