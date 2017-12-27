/* eslint no-console: 0 */
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/index');
const seed = require('./database/seed');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(indexRoutes);

seed();

app.listen(3000, () => {
  console.log('SmartFridge running on port 3000.');
});

module.exports = { app };
