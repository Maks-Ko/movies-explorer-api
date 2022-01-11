const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFound-error');
const ValidationError = require('../errors/validation-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');

// создаёт пользователя
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким email уже существует');
      }
      // хеширует пароль
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email, password: hash, name,
        }))
        .then((userData) => {
          res.status(201).send(Object.assign(userData, { password: undefined }));
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError('Переданы некорректные данные'));
          }
          next(err);
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
        next(new UnauthorizedError('Неправильные почта или пароль'));
      }
      next(err);
    });
};

// возвращает информацию о пользователе (email и имя)
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// обновляет информацию о пользователе (email и имя)
const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true })
    .orFail(() => new PropertyError('NotFound', 'Обект не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        next(new NotFoundError('Объект не найден'));
      }
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports = {
  createUser, login, getUser, updateUser,
};
