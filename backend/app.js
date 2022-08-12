const express = require('express');
const app = express();

app.use(express.json());

//Import all routes
const foods = require('./routes/food');

app.use('/api/v1', foods);

const errorMiddleware = require('./middlewares/errors');
app.use(errorMiddleware); //Midleware to handle errors

module.exports = app;