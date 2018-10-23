const router = require('express').Router();
const { authorizedHandler, validQueryHandler } = require('../middlewares');
const { db } = require('../utils');
const { post } = require('../models');

// routes below
router.route('/posts')

  // all routes should run these middlewares first
  .all(authorizedHandler(0), validQueryHandler(Object.keys(post.schema.paths)))

  // GET/READ
  .get((req, res, next) => {
    if(Object.keys(req.query).length == 0) {
      post.find().lean().then(posts => {
        res.json(posts);
      })
    } else {
      let query = db.queryToAndDbQuery(req.query);
      post.find(query).lean().then(posts => {
        res.json(posts);
      })
    }
  })

  // POST/CREATE
  .post((req, res, next) => {
    if(Object.keys(req.query).length == 0) {
      post.create(req.body).then(post => {
        res.json(post);
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
      post.findOneAndUpdate(req.query, req.body, { new: true }).lean().then(post => {
        res.json(post);
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
      post.findOneAndDelete(req.query).lean().then(post => {
        res.json(post);
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
