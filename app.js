require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const controllers = require('./controllers');
const notfound = require('./notfound');
const app = express();

mongoose.connect(process.env.MONGODB || `mongodb://localhost/${process.env.npm_package_name}`, {
  useNewUrlParser: true
}, function(error) {
  if (error) return console.error(error.message);
});

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(controllers);
app.use(notfound);

module.exports = app;
