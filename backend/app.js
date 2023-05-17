require('dotenv').config();
// packages imports
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// middlewares imports
const limiter = require('./midlewares/limiter');
const { corsVerification } = require('./midlewares/cors');
// router
const router = require('./routes');

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

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(JWT_SECRET));

// routing
app.use(router);

// start server on the port
app.listen(PORT);

module.exports = app;
