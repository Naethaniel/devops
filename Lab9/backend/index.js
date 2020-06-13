const express = require('express');
const {v4: uuidv4} = require('uuid');
const { Pool } = require('pg');

const pgClient = new Pool({
  user: 'postgres',
  host: 'postgres-deployment',
  database: 'postgres',
  port: 5432
});

pgClient.on('error', () => console.log('Cannot connect to PG database'));

const app = express();
const appId = uuidv4();
const port = 5000;

app.get('/', (req, resp) => {
  resp.send(`[${appId}] Hello from my backend app`);
})

app.listen(port, err => {
  console.log(`Listeing on port ${port}`);
});
