module.exports = function(req, res, next) {
  let authorized = true;
  if (authorized) {
    return next();
  }
  res.status(401);
  return next(new Error(`Not Authorized - ${req.originalUrl}`));
}
