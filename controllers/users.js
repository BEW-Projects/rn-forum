const router = require('express').Router();
const { authorizedHandler, validQueryHandler } = require('../middlewares');
const { db } = require('../utils');
const { user } = require('../models');

// routes below
router.route('/users')

  // all routes should run these middlewares first
  .all(authorizedHandler(3), validQueryHandler(Object.keys(user.schema.paths)))

  // GET/READ
  .get((req, res, next) => {
    if(Object.keys(req.query).length == 0) {
      user.find().lean().then(users => {
        res.json(users);
      }).catch(error => {
        res.status(500);
        next(new Error(error));
      });
    } else {
      let query = db.queryToAndDbQuery(req.query);
      user.find(query).lean().then(users => {
        res.json(users);
      }).catch(error => {
        res.status(500);
        next(new Error(error));
      });
    }
  })

  // POST/CREATE
  .post((req, res, next) => {
    if(Object.keys(req.query).length == 0) {
      user.create(req.body).then(user => {
        res.json(user);
      }).catch(error => {
        res.status(500);
        next(new Error(error));
      });
    } else {
      res.status(400);
      next(new Error(`Route does not accept query parameters - ${req.method} ${req.originalUrl}`));
    }
  })

  // PUT/UPDATE
  .put((req, res, next) => {
    if(Object.keys(req.query).length == 1) {
      user.findOneAndUpdate(req.query, req.body, { new: true }).lean().then(user => {
        res.json(user);
      }).catch(error => {
        res.status(500);
        next(new Error(error));
      });
    } else {
      res.status(400);
      next(new Error(`Route requires a single query parameter - ${req.method} ${req.originalUrl}`));
    }
  })

  // DELETE/REMOVE
  .delete((req, res, next) => {
    if(Object.keys(req.query).length == 1) {
      user.findOneAndDelete(req.query).lean().then(user => {
        res.json(user);
      }).catch(error => {
        res.status(500);
        next(new Error(error));
      });
    } else {
      res.status(400);
      next(new Error(`Route requires a single query parameter - ${req.method} ${req.originalUrl}`));
    }
  });

  // get current logged in user
  router.get(`/users/current`, (req, res, next) => {
    if(req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401);
      next(new Error(`You are not currently logged in! Please login again.`));
    }
  });

  // login user and set session
  router.post(`/users/login`, (req, res, next) => {
    user.authenticate(req.body.email, req.body.password).then(user => {
      req.session.user = user;
      res.json(user);
    }).catch(error => {
      res.status(401);
      next(new Error(error));
    });
  });

  // logout user by destroying session
  router.post(`/users/logout`, (req, res, next) => {
    req.session.destroy();
    res.send();
  });

module.exports = router;
