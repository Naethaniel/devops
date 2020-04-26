const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');

const app = express();
app.use(cors());
app.use(bodyParser.json());
console.log(keys);

const port = 5000;

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort
});

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
