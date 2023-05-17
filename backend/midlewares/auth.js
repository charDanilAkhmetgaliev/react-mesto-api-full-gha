const jwt = require('jsonwebtoken');
const ValidationError = require('../scripts/components/errors/ValidationError');
const { JWT_SECRET } = require('../scripts/utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new ValidationError('не корректный jwt'));
      return;
    }

    req.user = payload;

    next();
  } else {
    next(new ValidationError('jwt не найден'));
  }
};
