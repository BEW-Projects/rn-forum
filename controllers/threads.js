const router = require('express').Router();
const { authorizedHandler, validQueryHandler } = require('../middlewares');
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
      thread.find(req.query).lean().then(threads => {
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
