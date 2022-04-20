const logger = require('./logger')

const requestLogger = (req, _, next) => {
  logger.info('Method: ', req.method);
  logger.info('Path: ', req.path);
  logger.info('Body: ', req.body);
  logger.info('---');
  next()
}

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, __, res, next) => {
  logger.error(err);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err);
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
