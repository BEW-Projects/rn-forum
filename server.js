var env = process.env.NODE_ENV || 'dev';
if(env == 'dev') process.env.NODE_ENV = 'dev';
require('dotenv').config();
const express = require('express');
const controllers = require('./controllers');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { db, importer } = require('./utils');
const { notFoundHandler, errorHandler } = require('./middlewares');
const app = express();

const dbConnection = db.connect();

// setup express session
app.use(session({
    secret: 'juicyrainbowbunny007',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000  // 30 minutes
    },
    store: new MongoStore({
        mongooseConnection: dbConnection
    })
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// Make sure we aren't passing in any of our destructured imports from the controllers
for (var i in controllers) {
  if (Object.getPrototypeOf(controllers[i]) != express.Router) {
    delete controllers[i];
  }
}

importer.progress.start('controllers', Object.keys(controllers).length);
for (var i in controllers) {
    app.use(controllers[i]);
    importer.progress.update(i);
}
importer.progress.end('controllers');

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
