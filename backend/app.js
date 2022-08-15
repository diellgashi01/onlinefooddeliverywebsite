const express = require('express');
const app = express();

app.use(express.json());

//Import all routes
const foods = require('./routes/food');
const auth = require('./routes/auth');

app.use('/api/v1', foods);
app.use('/api/v1', auth);

const errorMiddleware = require('./middlewares/errors');
app.use(errorMiddleware); //Midleware to handle errors

module.exports = app;