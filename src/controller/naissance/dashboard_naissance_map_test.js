const birth = new Birth();
birth.getBirthsByCountry().then((births) => {
    // Traitez les données des naissances par pays
    const countryGrouped = birth.groupValueByColumn("country", births);
    const countriesData = Object.entries(countryGrouped);

    fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
        .then((result) => result.json())
        .then((datapoint) => {
            const countries = ChartGeo.topojson.feature(datapoint, datapoint.objects.countries).features;

            // Associez les données de naissances par pays avec les pays sur la carte
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
                labels : countries.map(country => country.properties.name),
                datasets : [{
                        label : 'Countries',
                        data : countries.map((country, index) => ({
                            feature: country,
                            value : country.properties.births
                            value: values[index],
                            color: scale(values[index]).hex()
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
        });
});
