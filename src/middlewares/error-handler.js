import logger from "../utils/logger.js";

const ErrorHandler = (err, req, res, next) => {
  if (err.code == 422) {
    res.status(422);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
      errors: err.errors || []
    });
  }
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  logger.error(err.stack);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  });
};

export default ErrorHandler;