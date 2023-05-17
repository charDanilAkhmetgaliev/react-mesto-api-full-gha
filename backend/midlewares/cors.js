const { ALLOWED_CORS, DEFAULT_ALLOWED_METHODS } = require('../scripts/utils/constants');

const corsVerification = (req, res, next) => {
  const { origin } = req.headers;

  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req;

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    const requestHeaders = req.headers['access-control-request-headers'];

    res.header('Access-Control-Allow-Headers', requestHeaders);

    res.end();
    return;
  }

  next();
};

module.exports = {
  corsVerification,
};
