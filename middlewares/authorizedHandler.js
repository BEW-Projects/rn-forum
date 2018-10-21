module.exports = function(level) {
  return function(req, res, next) {
    // TODO: here is where we will implement session/jwt logic to determine if client is logged in.
    // if user has specific access level or higher, then user will be authorized
    let authorized = true;
    let role = 3;
    if (authorized && role >= level) {
      return next();
    }
    res.status(401);
    return next(new Error(`Not Authorized - ${req.method} ${req.originalUrl}`));
  }
}
