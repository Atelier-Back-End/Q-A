const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  user: process.env.PG_USERNAME,
  host: process.env.PG_HOST,
  database: 'qna',
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});

// Connect to the PostgreSQL database
/*
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err));*/

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });
//connectToDatabase();

module.exports = client;

