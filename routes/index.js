const router = require('express').Router();
const authUser = require('./auth-user');
const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');
const notFoundRoutes = require('../middlewares/not-found-routes');

router.use(authUser);
router.use('/', auth);
router.use(users);
router.use(movies);
router.use('*', notFoundRoutes);

module.exports = router;
