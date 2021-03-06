const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/validation-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const {
  created, userWithEmailExists, incorrectData, incorrectDataUser,
} = require('../utils/constants');

// создаёт пользователя
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(userWithEmailExists);
      }
      // хеширует пароль
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email, password: hash, name,
        }))
        .then((userData) => {
          res.status(created).send(Object.assign(userData, { password: undefined }));
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError(incorrectData));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

// проверяет почту и пароль
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        next(new UnauthorizedError(incorrectDataUser));
      } else {
        next(err);
      }
    });
};

module.exports = { createUser, login };
