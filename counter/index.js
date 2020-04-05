const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  host: 'my-redis-server',
  port: 6379
})

client.set('counter', 0)

app.get('/', (req, res) => {
  client.get('counter', (err, counter_value) => {
    res.send(`Counter ${counter_value}`);
    client.set('counter', parseInt(counter_value) + 1)
  })
});

app.get('/nwd', (req, res) => {
  const key = `GCD(${req.query.l1},${req.query.l2})`;
  client.get(key, (err, value) => {
    if (!value) {
      console.log('GCD not found in cache');
      const gcd = gcd_rec(parseInt(req.query.l1), parseInt(req.query.l2));
      client.set(key, parseInt(gcd));
      res.send({gcd});
    }
    else {
      console.log('Sending GCD from cache');
      res.send({gcd: value});
    }
  })
})

function gcd_rec(a, b) {
    if (b) {
        return gcd_rec(b, a % b);
    } else {
        return Math.abs(a);
    }
}

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
