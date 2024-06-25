import createError from 'http-errors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import cors from 'cors';
import xss from 'xss-clean';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from './src/utils/logger.js';
import mongoose from 'mongoose';
import dbConfig from './src/config/database.js';
import apiRouter from './src/routes/api.js';
import authRouter from './src/routes/auth.js';
import NotFoundHandler from './src/middlewares/notfound-handler.js';
import ErrorHandler from './src/middlewares/error-handler.js';
import RateLimiter from './src/middlewares/rate-limit.js';
import ExpressMongoSanitize from 'express-mongo-sanitize';

// Load environment variables from .env file, based on NODE_ENV
const env = process.env.NODE_ENV || 'development';
if (env === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config();
}

// // Database Connection
mongoose.connect(dbConfig.connectionUrl).then(
  () => { console.log("Connected") },
  err => { console.log("DB error", err) }
);

var app = express();

app.use(helmet()); // 
app.use(xss()); // 

app.use(express.json());
app.use(express.static("src/public"))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(RateLimiter);

app.use('/api', apiRouter);
app.use('/api', authRouter);

app.use(NotFoundHandler);
app.use(ErrorHandler);
app.use(ExpressMongoSanitize());
app.use(ExpressMongoSanitize({
  replaceWith: '_'
}));
// error handler
app.use((err, req, res, next) => {
  logger.error(err.stack); // Log the stack trace of the error
  res.status(500).json({ error: err.message }); // Send a 500 response with the error message
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running at ${process.env.APP_URL}/`);
});

export { app };
