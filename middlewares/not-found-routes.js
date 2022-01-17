const NotFoundError = require('../errors/notFound-error');
const { pageNotFound } = require('../utils/constants');

module.exports = (req, res, next) => {
  next(new NotFoundError(pageNotFound));
};
