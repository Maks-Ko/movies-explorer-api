require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const users = require('./routes/users');
const movies = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const notFoundRoutes = require('./middlewares/not-found-routes');
const { validationCreateUser, validationLogin } = require('./middlewares/validation-joi');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/dipfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use(auth);

app.use('/', users);
app.use('/', movies);

app.use('*', notFoundRoutes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line no-console
});
