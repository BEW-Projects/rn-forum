const router = require('express').Router();
const { authorizedHandler, validQueryHandler } = require('../middlewares');
const { category } = require('../models');

// routes below
router.route('/categories')
  .all(authorizedHandler, validQueryHandler(Object.keys(category.schema.paths)))
  .get((req, res, next) => {
    if(Object.keys(req.query).length == 0) {
      category.find().lean().then(categories => {
        res.json(categories);
      })
    } else {
      category.find(req.query).lean().then(categories => {
        res.json(categories);
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
