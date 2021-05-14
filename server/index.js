const express = require('express');
const path = require('path');
const redis = require('redis');
const app = express();
require('dotenv').config();

const redisPort = 6379
const client = redis.createClient(redisPort);

client.on("error", (err) => {
    console.log(err);
});

app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(express.json());

app.use('/', require('./routes'));
const port = process.env.PORT || 1128;

app.listen(port, () => {
  console.log('Server listening at PORT: ', port);
});
exports.client = client;