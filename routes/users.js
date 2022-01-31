const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validationUpdateUser } = require('../middlewares/validation-joi');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', validationUpdateUser, updateUser);

module.exports = router;
