const router = require('express').Router();
const { authorizedHandler, validQueryHandler } = require('../middlewares');
const { db } = require('../utils');
const { category } = require('../models');

// routes below
router.route('/categories')

  // all routes should run these middlewares first
  .all(authorizedHandler(0), validQueryHandler(Object.keys(category.schema.paths)))

  // GET/READ
  .get((req, res, next) => {
    if(Object.keys(req.query).length == 0) {
      category.find().lean().then(categories => {
        res.json(categories);
      })
    } else {
      let query = db.queryToAndDbQuery(req.query);
      category.find(query).lean().then(categories => {
        res.json(categories);
      })
    }
  })

  // POST/CREATE
  .post((req, res, next) => {
    if(Object.keys(req.query).length == 0) {
      category.create(req.body).then(category => {
        res.json(category);
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
      category.findOneAndUpdate(req.query, req.body, { new: true }).lean().then(category => {
        res.json(category);
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
      category.findOneAndDelete(req.query).lean().then(category => {
        res.json(category);
      }).catch(error => {
        res.status(500);
        next(new Error(error));
      });
    } else {
      res.status(400);
      next(new Error(`Route requires a single query parameter - ${req.method} ${req.originalUrl}`));
    }
  });

module.exports = router;
