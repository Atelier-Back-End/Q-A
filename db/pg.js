const { Client } = require('pg');
import dotenv from 'dotenv';
dotenv.config();

export const client = new Client({
  user: process.env.USERNAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
});

// Connect to the PostgreSQL database
/*
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err));*/

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL')
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err.message);
    process.exit(1);
  }
}
connectToDatabase();

export {client};

