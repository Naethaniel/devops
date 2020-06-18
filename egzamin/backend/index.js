// Express App Setup

console.log({
  redisHost: process.env.REDISHOST,
  redisPort: process.env.REDISPORT,
  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDB,
  pgPassword: process.env.PGPASSWORD,
  pgPort: process.env.PGPORT
})

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

const redisClient = redis.createClient({
  host: process.env.REDISHOST,
  port: process.env.REDISPORT
});

const { Pool } = require('pg');

const pgClient = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDB,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

pgClient.on('error', () => console.log('Cannot connect to PG database'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS volumes (height INT, radius INT, volume INT)')
  .catch(err => console.log(err));

app.post('/cone-volume', (req, res) => {
  const {height, radius} = req.body;
  const key = `${height}-${radius}`;
  redisClient.get(key, async (err, value) => {
    if (!value) {
      const coneVolume = 1/3 * Math.PI * radius * radius * height;
      redisClient.set(key, coneVolume);
      pgClient.query(`INSERT INTO volumes(height, radius, volume) VALUES (${height}, ${radius}, ${coneVolume})`);
      res.send({volume: coneVolume});
    }
    else {
      console.log('Volume found in cache. Returning it.')
      res.send({volume: value})
    }
  })
});

app.get('/results', async (req, res) => {
  const results = await pgClient.query('SELECT * FROM volumes');
  res.send({volumes: results.rows});
})

app.listen(port, err => {
  console.log(`Backend app listening on ${port}`);
})
