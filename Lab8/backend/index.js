const express = require('express');
const {v4: uuidv4} = require('uuid');
const redis = require("redis");

const client = redis.createClient({
	host: 'redis-service',
	port: 6379
});

const app = express();
const appId = uuidv4();
const port = 5000;

app.get('/', (req, resp) => {
  resp.send(`[${appId}] Hello from my backend app`);
})

app.listen(port, err => {
  console.log(`Listeing on port ${port}`);
});
