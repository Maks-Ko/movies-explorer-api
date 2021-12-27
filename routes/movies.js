const router = require('express').Router();
const { getMovies, createMovie, deleteMovieId } = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм с переданными в теле данными
router.post('/movies', createMovie);

// удаляет сохранённый фильм по id
router.delete('/movies/:movieId', deleteMovieId);

module.exports = router;
