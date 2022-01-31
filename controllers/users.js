const User = require('../models/user');
const NotFoundError = require('../errors/notFound-error');
const ValidationError = require('../errors/validation-error');
const ConflictError = require('../errors/conflict-error');
const { objectNotFound, incorrectData, userWithEmailExists } = require('../utils/constants');

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
    .orFail(() => new NotFoundError(objectNotFound))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(incorrectData));
      } else if (err.codeName === 'DuplicateKey') {
        next(new ConflictError(userWithEmailExists));
      } else {
        next(err);
      }
    });
};

module.exports = { getUser, updateUser };
