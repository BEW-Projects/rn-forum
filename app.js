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

for (var i in controllers) {

  // Make sure we aren't passing in any of our destructured imports from the controllers
  if (Object.getPrototypeOf(controllers[i]) == express.Router) {
    console.log(`Importing ${i} controller`);
    app.use(controllers[i]);
  }
  
}
app.use(notfound);

module.exports = app;
