import express from 'express';
import dotenv from 'dotenv';
import {client} from './db/pg.js';
dotenv.config()

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use(morgan('dev'));
app.use(cors());

client.connect();

client.query('SELECT * FROM questions WHERE id = 1 limit 1', (err, res) => {
  if(err) {
    console.error('Error connecting to PostgreSQL database')
  } else {
    console.log('Successfully connected to PostgreSQL database')
  }
})


app.listen(port, ()=> {
  console.log(`Listening on https://localhost:${port}`)
})