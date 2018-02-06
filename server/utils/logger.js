'use strict';
/**
 * Require our modules
 */
const config = require('../../config/config');
const winston = require('winston');
const fs = require('fs');

// Define our Timestamp Format
const tsFormat = () => (new Date()).toLocaleTimeString();

// Create the log directory if it does not exist before defining the logger
if (!fs.existsSync( config.logging.dir )) {
  fs.mkdirSync( config.logging.dir );
}

// Define the Logger
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    // Make a new Log File per day
    new (require('winston-daily-rotate-file'))({
      filename: `${ config.logging.dir }/-results.log`,
      timestamp: tsFormat,
      datePattern: config.logging.datePattern,
      prepend: true,
      level: config.logging.level
    })
  ]
});
// Export the module
module.exports = logger;