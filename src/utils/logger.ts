import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    if (stack) {
      return `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`;
    }
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// Create Winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      ),
    }),
    // Write all logs to combined.log
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write error logs to error.log
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

// Export logger functions
export const Logger = {
  info: (message: string, meta?: any) => {
    logger.info(message, meta);
  },
  
  warn: (message: string, meta?: any) => {
    logger.warn(message, meta);
  },
  
  error: (message: string, error?: Error | any) => {
    if (error instanceof Error) {
      logger.error(message, { stack: error.stack, message: error.message });
    } else {
      logger.error(message, error);
    }
  },
  
  debug: (message: string, meta?: any) => {
    logger.debug(message, meta);
  },
  
  // Test-specific logging
  testStart: (testName: string) => {
    logger.info(`========== TEST START: ${testName} ==========`);
  },
  
  testEnd: (testName: string, status: 'PASSED' | 'FAILED') => {
    logger.info(`========== TEST END: ${testName} - ${status} ==========`);
  },
  
  step: (stepDescription: string) => {
    logger.info(`STEP: ${stepDescription}`);
  },
};

export default Logger;
