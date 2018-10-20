const router = require('express').Router();
const { authorizedHandler, validQueryHandler } = require('../middlewares');
const { post } = require('../models');

// routes below
router.route('/posts')
  .all(authorizedHandler, validQueryHandler(Object.keys(post.schema.paths)))
  .get((req, res, next) => {
    if(Object.keys(req.query).length == 0) {
      post.find().lean().then(posts => {
        res.json(posts);
      })
    } else {
      post.find(req.query).lean().then(posts => {
        res.json(posts);
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
