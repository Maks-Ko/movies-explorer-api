const Movie = require('../models/movie');
const ValidationError = require('../errors/validation-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/notFound-error');
const { incorrectData, objectNotFound, noRights } = require('../utils/constants');

// возвращает все сохранённые текущим  пользователем фильмы
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

// создаёт фильм с переданными в теле данными
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(incorrectData));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по movieId
const deleteMovieId = (req, res, next) => {
  Movie.findOne(req.params)
    .orFail(() => new NotFoundError(objectNotFound))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError(noRights);
      } else {
        return Movie.findOneAndRemove(req.params)
          .then((movieDelete) => res.send({ data: movieDelete }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(incorrectData));
      } else {
        next(err);
      }
    });
};

module.exports = { getMovies, createMovie, deleteMovieId };
