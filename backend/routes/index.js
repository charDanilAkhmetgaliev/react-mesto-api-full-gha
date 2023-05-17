const router = require('express').Router();
const { celebrate, errors } = require('celebrate');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const { logout, createUser, login } = require('../controllers/users');
const auth = require('../midlewares/auth');
const { schemaBodySignUp, schemaBodySignIn } = require('../scripts/utils/clbSchemas');
const { requestLogger, errorLogger } = require('../midlewares/logger');
const ObjectNotFoundError = require('../scripts/components/errors/ObjectNotFoundError');
const { handlerError } = require('../scripts/utils/errors');

// logger req
router.use(requestLogger);

// handler crash test
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// handler authentication router
router.post('/signin', celebrate({
  body: schemaBodySignIn,
}), login);

// handler register router
router.post('/signup', celebrate({
  body: schemaBodySignUp,
}), createUser);

// handler authorization
router.use(auth);

// handler logout
router.get('/logout', logout);

// handler routing
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

// handler wrong url
router.use((req, res, next) => {
  next(new ObjectNotFoundError('Страница не найдена'));
});

// logger err
router.use(errorLogger);

// handler celebrate errors
router.use(errors());

// handler errors
router.use((err, req, res, next) => handlerError(err, res, next));

module.exports = router;
