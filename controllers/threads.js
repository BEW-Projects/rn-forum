const router = require('express').Router();
const { authorizedHandler, validQueryHandler } = require('../middlewares');
const { db } = require('../utils');
const { thread } = require('../models');

// routes below
router.route('/threads')
  .all(authorizedHandler, validQueryHandler(Object.keys(thread.schema.paths)))
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
  .post((req, res) => {

  })
  .put((req, res) => {

  })
  .delete((req, res) => {

  });

module.exports = router;
