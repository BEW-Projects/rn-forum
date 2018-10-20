const { db } = require('../utils');

module.exports = function(paths) {
  return function(req, res, next) {
    if (Object.keys(req.query).length > 0) {
      for(var i in req.query) {
        if(!paths.includes(i) || req.query[i] == '') {
          res.status(400);
          return next(new Error(`Invalid query term for controller - ${req.originalUrl}`));
        } else if(i == '_id' && req.query[i] != '') {
          if (db.isValidObjectId(req.query._id)) {
            return next();
          }
          res.status(400);
          return next(new Error(`Invalid value for query term _id - ${req.query._id}`));
        }
      }
    }
    return next();
  }
}
