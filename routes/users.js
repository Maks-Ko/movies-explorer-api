const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', updateUser);

module.exports = router;
