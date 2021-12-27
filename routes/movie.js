const router = require('express').Router();
const { getMoveis, createMovei, deleteMoveiId } = require('../controllers/movei');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', getMoveis);

// создаёт фильм с переданными в теле данными
router.post('/movies', createMovei);

// удаляет сохранённый фильм по id
router.delete('/movies/movieId', deleteMoveiId);

module.exports = router;
