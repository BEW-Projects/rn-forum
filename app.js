require('dotenv').config();
const express = require('express');
const controllers = require('./controllers');
const notfound = require('./notfound');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(controllers);
app.use(notfound);

module.exports = app;
