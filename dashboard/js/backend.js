// Connexion à la base de données
const {Client} = require('pg');
const Pool = require("pg").Pool;

<<<<<<< HEAD
=======

>>>>>>> ad2eca632c8680a4ed999240197d3a536006e4a7
const client = new Client({
    host : "db.ggaotsudljxsthdmqksc.supabase.co",
    user : "postgres",
    port : 5432,
    password : "alaingely57",
    database : "postgres"
});

client.connect();

// Création des tables

/*
client.query("CREATE TABLE births( \
        idBirth INT PRIMARY KEY  NOT NULL, \
        country VARCHAR(150) NOT NULL, \
        bank_income VARCHAR(150) NOT NULL, \
        continent VARCHAR(150) NOT NULL, \
        year VARCHAR(4) NOT NULL, \
        area VARCHAR(150), \
        month VARCHAR(9), \
        source_year VARCHAR (4), \
<<<<<<< HEAD
        value INT NOT NULL \
=======
        value INT NOT NULL, \
>>>>>>> ad2eca632c8680a4ed999240197d3a536006e4a7
    )"
);

/*
client.query("CREATE TABLE deaths( \
        idDeath INT PRIMARY KEY NOT NULL, \
        Region_code VARCHAR(3) NOT NULL, \
        Region_Name VARCHAR(31) NOT NULL, \
        Country_Code VARCHAR(3) NOT NULL, \
        Country_Name VARCHAR(150) NOT NULL, \
        Year INT NOT NULL, \
        Sex VARCHAR(7) NOT NULL, \
        Age_group_code VARCHAR(15) NOT NULL, \
        Age_Group VARCHAR(15) NOT NULL, \
        Number INT \
    )"
);
<<<<<<< HEAD
=======

>>>>>>> ad2eca632c8680a4ed999240197d3a536006e4a7

*/
// Insertion des données

// packages
const fs = require("fs");
const fastcsv = require("fast-csv");

// lecture du fichier csv
let deaths = fs.createReadStream("D:/STID/3A/ressources/web/dataviz-mondial-population/data/deaths.csv");
let csvData = [];
let csvDeaths = fastcsv
    .parse()
    .on("data", function(data){
        csvData.push(data[0].split(';'));
    })
    .on("end", function(){
        csvData.shift();  // retirer la ligne header

        // Nouvelle connexion à la base de données
        const pool = new Pool({
            host : "db.ggaotsudljxsthdmqksc.supabase.co",
            user : "postgres",
            port : 5432,
            password : "alaingely57",
            database : "postgres"
        });

        pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        });

        pool.connect().then(client => {
            const query = "INSERT INTO deaths (idDeath,Region_code,Region_Name,Country_Code,Country_Name,Year,Sex,Age_group_code,Age_Group,Number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";

            try{
                csvData.forEach(row => {
                    console.log("Inserting : ", {row});

                    client.query(query, row, (err, res)=> {
                        if (err) {
                            console.log(err.stack);
                        } else {
                            console.log("insérée ");
                        }
                    });
                });
            } catch (err) {
                console.error(err);
            }
    
        }).catch(err => {
            console.error(err);
        });

    });

<<<<<<< HEAD
deaths.pipe(csvDeaths); 
=======
deaths.pipe(csvDeaths); 
*/
>>>>>>> ad2eca632c8680a4ed999240197d3a536006e4a7
