const birth = new Birth();
birth.getBirthsByCountry().then((births) => {

    // Traitez les données des naissances par pays
    const countryGrouped = birth.groupValueByColumn("country", births);
    const countriesData = Object.entries(countryGrouped);

    // Ce lien renvoie aux données sur les pays pour créer la carte
    fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
        .then((result) => result.json())
        .then((datapoint) => {
            const countries = ChartGeo.topojson.feature(datapoint, datapoint.objects.countries).features;

            const colorScale = chroma.scale(['lightblue', 'darkblue']).domain([0, 200000]);

            // Associez les données de naissances par pays avec les pays sur la carte
            countries.forEach((country) => {
                const countryName = country.properties.name;
                const countryBirths = countriesData.find((entry) => entry[0] === countryName);

                if (countryBirths) {
                    country.properties.births = countryBirths[1]; // Ajoutez la valeur des naissances au pays correspondant
                } else {
                    country.properties.births = 0; // Par défaut, attribuez 0 aux pays sans données
                }

                const color = colorScale(country.properties.births).hex();
                country.properties.color = color;
            });

            const data = {
                labels : countries.map(country => country.properties.name),
                datasets : [{
                        label : 'Countries',
                        data : countries.map(country => ({
                            feature: country,
                            value : country.properties.births
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
                },
                colorAxis: {
                    inputDomain: [0, 200000], // Adapter l'intervalle de couleurs en fonction de vos données
                    outputColor: (d) => colorScale(d).hex()
                }
            };
    
            const myChart = new Chart(
                document.getElementById('map'),
                config
            );
        });
});
