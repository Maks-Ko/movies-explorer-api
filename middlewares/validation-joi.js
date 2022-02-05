const { celebrate, Joi } = require('celebrate');
const { regularExpressionUrl } = require('../utils/constants');

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(8),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }),
    name: Joi.string().min(2).max(30),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regularExpressionUrl),
    trailer: Joi.string().required().pattern(regularExpressionUrl),
    thumbnail: Joi.string().required().pattern(regularExpressionUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }).unknown(true),
});

const validationMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }).unknown(true),
});

module.exports = {
  validationCreateUser,
  validationLogin,
  validationUpdateUser,
  validationCreateMovie,
  validationMovieId,
};
