const router = require('express').Router();
const { authorizedHandler, validQueryHandler } = require('../middlewares');
const { db } = require('../utils');
const { forum } = require('../models');

// routes below
router.route('/forums')

  // all routes should run these middlewares first
  .all(authorizedHandler(0), validQueryHandler(Object.keys(forum.schema.paths)))

  // GET/READ
  .get((req, res, next) => {
    if(Object.keys(req.query).length == 0) {
      forum.find().lean().then(forums => {
        res.json(forums);
      })
    } else {
      let query = db.queryToAndDbQuery(req.query);
      forum.find(query).lean().then(forums => {
        res.json(forums);
      })
    }
  })

  // POST/CREATE
  .post((req, res, next) => {
    if(Object.keys(req.query).length == 0) {
      forum.create(req.body).then(forum => {
        res.json(forum);
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
      forum.findOneAndUpdate(req.query, req.body, { new: true }).lean().then(forum => {
        res.json(forum);
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
      forum.findOneAndDelete(req.query).lean().then(forum => {
        res.json(forum);
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
