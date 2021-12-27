const User = require('../models/user');
const NotFoundError = require('../errors/notFound-error');
const ValidationError = require('../errors/validation-error');

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

module.exports = { getUser, updateUser };
