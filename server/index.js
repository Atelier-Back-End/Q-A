const express =require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const {client} = require('/Users/richardli/hackreactoractual/Q-A/db/pg.js');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());



app.listen(port, ()=> {
  console.log(`Listening on https://localhost:${port}`)
})