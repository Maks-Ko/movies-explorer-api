const { badRequest } = require('../utils/constants');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = badRequest;
  }
}

module.exports = ValidationError;
