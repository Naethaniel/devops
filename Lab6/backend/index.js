const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
console.log(keys);

const port = 5000;

const { Pool } = require('pg');

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPortq
})

pgClient.on('error', () => console.log('Cannot connect to PG database'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello from backend');
});

app.listen(port, err => {
  console.log(`Backend app listening on ${port}`);
})
