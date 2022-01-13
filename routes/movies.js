const router = require('express').Router();
const { getMovies, createMovie, deleteMovieId } = require('../controllers/movies');
const { validationCreateMovie, validationMovieId } = require('../middlewares/validation-joi');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм с переданными в теле данными
router.post('/movies', validationCreateMovie, createMovie);

// удаляет сохранённый фильм по id
router.delete('/movies/:movieId', validationMovieId, deleteMovieId);

module.exports = router;
