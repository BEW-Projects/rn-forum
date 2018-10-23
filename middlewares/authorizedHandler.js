module.exports = function(level) {
  return function(req, res, next) {

    // if user is logged in and their role matches or is higher than specified, return all good
    if (req.session.user && req.session.user.role >= level) {
      return next();
    }
    res.status(401);
    return next(new Error(`Not Authorized - ${req.method} ${req.originalUrl}`));
  }
}
