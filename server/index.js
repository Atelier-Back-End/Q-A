const express =require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const {client} = require('./db/pg.js');
const router = require('./routes.js');
dotenv.config();

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', router);

app.get('/loaderio-670c1f606b75f5817ea9ac9c38f634c8', (req, res) => res.send('loaderio-670c1f606b75f5817ea9ac9c38f634c8'))

app.listen(port, ()=> {
  console.log(`Listening on http://${host}:${port}`)
})
