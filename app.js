const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const movies = require('./routes/movie');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/dipfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// временное решение авторизации
app.use((req, res, next) => {
  req.user = { _id: '61c96d8c6a6ff1e73522109d' };
  next();
});

app.use('/', users);
app.use('/', movies);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line no-console
});
