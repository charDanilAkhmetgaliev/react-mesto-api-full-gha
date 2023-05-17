const JWT_SECRET = process.env.NODE_ENV !== 'production' ? 'secret-key' : process.env.JWT_SECRET;

// regExp patterns
const REG_EXP_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REG_EXP_PASSWORD = /^[a-zA-Z0-9!@#$%^&*()_+<>?/.,{};':"\\|-]{8,20}$/;
const REG_EXP_LINK = /^https?:\/\/(www.)?[\w-]+\.[a-z]{2,}[\w\-.~:/?#@!$&'()*+,;=]*#?$/;
const REG_EXP_JWT = /^jwt=[\w\-.~+/\\]+$/;
// CORS
const ALLOWED_CORS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://mesto-online.nomoredomains.monster',
  'https://mesto-online.nomoredomains.monster',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  REG_EXP_LINK,
  REG_EXP_JWT,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
  JWT_SECRET,
};
