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

const request = "SELECT country, SUM(value) AS nb_naissance \
                 FROM births WHERE continent = 'Africa' \
                 GROUP BY country \
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

        const countries = data.map(item => item.country);
        const naissances = data.map(item => item.nb_naissance);

        console.log(countries);
        console.log(naissances);
    } catch (error) {
        // Gérer l'erreur, si il y en a une
    } finally {
        pool.end();
    }
}

main();
