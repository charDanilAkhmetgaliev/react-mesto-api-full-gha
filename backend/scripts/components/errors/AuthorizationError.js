class AuthorizationError extends Error {
  constructor(message = 'Ошибка авторизации') {
    super(message);
    this.name = 'AUTH_ERROR';
    this.statusCode = 401;
  }
}

module.exports = AuthorizationError;
