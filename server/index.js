const express =require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const {client} = require('./db/pg.js');
const router = require('./routes.js');
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', router);


app.listen(port, ()=> {
  console.log(`Listening on http://localhost:${port}`)
})