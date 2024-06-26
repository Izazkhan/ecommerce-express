// middlewares/notFoundHandler.js
import createError from 'http-errors';

const NotFoundHandler = (req, res, next) => {
  next(createError(404, 'Resource Not Found'));
};

export default NotFoundHandler;
