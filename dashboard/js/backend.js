// Connexion à la base de données
const {Client} = require('pg');

const client = new Client({
    host : "db.ggaotsudljxsthdmqksc.supabase.co",
    user : "postgres",
    port : 5432,
    password : "alaingely57",
    database : "postgres"
})

client.connect();

// Création des tables

client.query("CREATE TABLE deces (id INT PRIMARY KEY)");

// Insertion des données