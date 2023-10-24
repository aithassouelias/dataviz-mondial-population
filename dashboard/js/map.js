const url = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'

fetch(url).then((result)=>result.json()).then((datapoint)=> {
    const countries = ChartGeo.topojson.feature(datapoint, datapoint.objects.countries).features;

    console.log()

    const data = {
        labels : countries.map(country => country.properties.name),
        datasets : [{
            label : 'Countries',
            data : countries.map(country => ({feature: country, value : Math.random()
                })),
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

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

})

