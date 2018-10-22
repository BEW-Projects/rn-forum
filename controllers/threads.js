const router = require('express').Router();
const { authorizedHandler, validQueryHandler } = require('../middlewares');
const { db } = require('../utils');
const { thread } = require('../models');

// routes below
router.route('/threads')

  // all routes should run these middlewares first
  .all(authorizedHandler(3), validQueryHandler(Object.keys(thread.schema.paths)))

  // GET/READ
  .get((req, res, next) => {
    if(Object.keys(req.query).length == 0) {
      thread.find().lean().then(threads => {
        res.json(threads);
      })
    } else {
      let query = db.queryToAndDbQuery(req.query);
      thread.find(query).lean().then(threads => {
        res.json(threads);
      })
    }
  })

  // POST/CREATE
  .post((req, res, next) => {
    if(Object.keys(req.query).length == 0) {
      thread.create(req.body).then(thread => {
        res.json(thread);
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
      thread.findOneAndUpdate(req.query, req.body, { new: true }).lean().then(thread => {
        res.json(thread);
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
      thread.findOneAndDelete(req.query).lean().then(thread => {
        res.json(thread);
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
