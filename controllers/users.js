const router = require('express').Router();
const { authorizedHandler, validQueryHandler } = require('../middlewares');
const { user } = require('../models');

// routes below
router.route('/users')
  .all(authorizedHandler, validQueryHandler(Object.keys(user.schema.paths)))
  .get((req, res, next) => {
    if(Object.keys(req.query).length == 0) {
      user.find().lean().then(users => {
        res.json(users);
      })
    } else {
      user.find(req.query).lean().then(users => {
        res.json(users);
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
