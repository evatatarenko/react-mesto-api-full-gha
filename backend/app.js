/* eslint-disable linebreak-style */
require('dotenv').config();

const {
  PORT = 3000,
  URI = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const cookieParser = require('cookie-parser');
const errorCelebrate = require('celebrate').errors;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const validation = require('./middlewares/validation');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandlers = require('./utils/handlers');
const auth = require('./middlewares/auth');
const NotFound = require('./Errors/notFound');

const app = express();
mongoose.connection.on('error', () => {
  console.log('problem');
});

mongoose.connection.on('connected', () => {
  console.log('success');
});

mongoose.connect(URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(cors);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validation.validateSignin, login);
app.post('/signup', validation.validateSignup, createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('/', (req, res, next) => {
  next(new NotFound('маршрут не найден'));
});

app.use(errorLogger);
app.use(errorCelebrate());
app.use(errorHandlers);

app.listen(PORT, () => {
  console.log(`сервер запущен на порте: ${PORT}`);
});
