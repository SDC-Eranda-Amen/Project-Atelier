const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(express.json());

app.use('/', require('./routes'));

const port = process.env.PORT || 1128;

app.listen(port, () => {
  console.log('Server listening at PORT: ', port);
});
