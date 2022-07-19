const express = require('express');
const app = express();

app.use(express.json());

//Import all routes
const foods = require('./routes/food');

app.use('/api/v1', foods);

module.exports = app;