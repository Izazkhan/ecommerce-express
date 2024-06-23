import logger from "../utils/logger.js";

const ErrorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    logger.error(err.stack);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
      errors: err.errors || []
    });
  };
  
  export default ErrorHandler;