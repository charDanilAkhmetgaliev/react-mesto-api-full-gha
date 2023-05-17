require('dotenv').config();
// packages imports
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors, celebrate } = require('celebrate');
const cookieParser = require('cookie-parser');
// middlewares imports
const limiter = require('./midlewares/limiter');
const auth = require('./midlewares/auth');
const { errorLogger, requestLogger } = require('./midlewares/logger');
const { corsVerification } = require('./midlewares/cors');
// controllers imports
const { login, createUser, logout } = require('./controllers/users');
const { handlerError } = require('./scripts/utils/errors');
// errors
const ObjectNotFoundError = require('./scripts/components/errors/ObjectNotFoundError');
// celebrate schemas
const { schemaBodySignUp, schemaBodySignIn } = require('./scripts/utils/clbSchemas');

const { JWT_SECRET } = require('./scripts/utils/constants');

// initialize project
const app = express();
const { PORT = 3000 } = process.env;

// CORS protect
app.use(corsVerification);

// mongoDB server connecting
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// protect
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parse
app.use(cookieParser(JWT_SECRET));

// logger req
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// authentication rout
app.post('/signin', celebrate({
  body: schemaBodySignIn,
}), login);

// register rout
app.post('/signup', celebrate({
  body: schemaBodySignUp,
}), createUser);

// authorization
app.use(auth);

// logout
app.get('/logout', logout);
// routing
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// handler wrong url
app.use((req, res, next) => {
  next(new ObjectNotFoundError('Страница не найдена'));
});

// logger err
app.use(errorLogger);

// handler celebrate errors
app.use(errors());
// handler errors
app.use((err, req, res, next) => handlerError(err, res, next));

// start server on the port
app.listen(PORT);
