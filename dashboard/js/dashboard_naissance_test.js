document.addEventListener('DOMContentLoaded', async () => {
    console.log("Événement DOMContentLoaded déclenché");
  
      // Connexion à la base de données
    const { Pool } = require('pg');
  
    const pool = new Pool({
        host : "db.ggaotsudljxsthdmqksc.supabase.co",
        user : "postgres",
        port : 5432,
        password : "alaingely57",
        database : "postgres"
    });
  
    // requête à éxécuter
  
    const request = "SELECT year, SUM(value) AS nb_naissance \
                    FROM births WHERE continent = 'Africa' \
                    GROUP BY year \
                    ORDER BY nb_naissance";
  
    // Création d'une fonction asynchrone afin de récupérer l'ensemble des données lorsque la requête est terminée
  
    // Fonction pour récupérer les données
    async function getDataFromDatabase() {
        const client = await pool.connect();
  
        try {
            const result = await client.query(request);
            const data = result.rows;
            return data;
        } catch (err) {
            console.error('Erreur lors de la requête:', err.message);
            throw err;
        } finally {
            client.release();
        }
    }
  
    /* Fonction pour récupérer les données à l'aide de la fonction précédente 
    et permettant d'extraire les données en plusieurs tableaux
    */
    async function main() {
        try {
            const data = await getDataFromDatabase();
  
            const years = data.map(item => item.year);
            const naissances = data.map(item => item.nb_naissance);
  
            const ctx = document.getElementById('lineChart');
  
            new Chart(ctx, {
              type: 'line',
              data: {
                labels: years,
                datasets: [
                  {
                    label: 'Nombre de naissance',
                    data: naissances,
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
  
            console.log(years);
            console.log(naissances);
        } catch (error) {
            // Gérer l'erreur, si il y en a une
        } finally {
            pool.end();
        }
    }
  
    main();
  
  
   
    
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
          labels: ['Algeria','Morocco','France','United States of America','Ivory Cost','China','Portugal','Spain','Germany','South Africa'],
          datasets: [
        {
        label: 'Nombre de naissance',
        data: [90,85,80,75,70,65,60,55,50,45],
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