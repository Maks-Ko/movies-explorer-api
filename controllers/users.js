const User = require('../models/user');

// возвращает информацию о пользователе (email и имя)
const getUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

// обновляет информацию о пользователе (email и имя)
const updateUser = (req, res) => {

};

module.exports = { getUser, updateUser };
