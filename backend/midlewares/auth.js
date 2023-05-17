const jwt = require('jsonwebtoken');
const AuthorizationError = require('../scripts/components/errors/AuthorizationError');
const { JWT_SECRET } = require('../scripts/utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new AuthorizationError('не корректный jwt'));
      return;
    }

    req.user = payload;

    next();
  } else {
    next(new AuthorizationError('jwt не найден'));
  }
};
