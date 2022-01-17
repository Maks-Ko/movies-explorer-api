const router = require('express').Router();
const { createUser, login } = require('../controllers/auth-user');
const { validationCreateUser, validationLogin } = require('../middlewares/validation-joi');

// создаёт пользователя
router.post('/signup', validationCreateUser, createUser);

// проверяет почту и пароль
router.post('/signin', validationLogin, login);

module.exports = router;
