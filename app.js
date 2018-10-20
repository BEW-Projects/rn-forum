require('dotenv').config();
const express = require('express');
const controllers = require('./controllers');
const notfound = require('./utils/notfound');
const db = require('./utils/db');
const app = express();

const dbConnection = db.connect();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(controllers);
app.use(notfound);

module.exports = app;
