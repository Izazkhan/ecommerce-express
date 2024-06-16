import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, json } = format;

const logger = createLogger({
  level: 'error', // You can set this to 'info' or other levels for different log details
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }) // Log errors to file
  ]
});

export default logger;