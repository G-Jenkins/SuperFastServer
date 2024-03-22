require("dotenv").config()
const { Client } = require('pg');


const express = require('express')
const app = express()
const port = 3030


const client = new Client({
 host: 'localhost', // change later
 port: 3000, //change later
 database: 'mystic', // change later
})
app.get('/', (req, res) => {
 res.send('Hello World!')
})


client.connect()
 .then(() => {
   console.log('Connected to PostgreSQL database');


   // Execute SQL queries here


   client.query('SELECT * FROM answers LIMIT 1', (err, result) => {
     if (err) {
       console.error('Error executing query', err);
     } else {
       console.log('Query result:', result.rows);
     }


     // Close the connection when done
     client.end()
       .then(() => {
         console.log('Connection to PostgreSQL closed');
       })
       .catch((err) => {
         console.error('Error closing connection', err);
       });
   });
 })
 .catch((err) => {
   console.error('Error connecting to PostgreSQL database', err);
 });








app.listen(port, () => {
 console.log(`its happening at port ${port}`)
})
