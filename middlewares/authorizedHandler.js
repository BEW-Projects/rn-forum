module.exports = function(req, res, next) {
  // TODO: here is where we will implement session/jwt logic to determine if client is logged in and authorized to view routes.
  let authorized = true;
  if (authorized) {
    return next();
  }
  res.status(401);
  return next(new Error(`Not Authorized - ${req.method} ${req.originalUrl}`));
}
