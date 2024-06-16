import createError from 'http-errors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from './logger.js';
import mongoose from 'mongoose';
import dbConfig from './src/config/database.js';
import apiRouter from './src/routes/api.js';
import authRouter from './src/routes/auth.js';

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
// mongoose.connection.on('connected', () => {
// });


// mongoose.connection.on('error', (err) => {
//   console.log('Database error: ' + err);
// })

var app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'src/public')));

app.use('/api', apiRouter);
app.use('/api/user', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  logger.error(err.stack); // Log the stack trace of the error
  res.status(500).json({ error: err.message }); // Send a 500 response with the error message
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.APP_PORT}/`);
});

export { app };
