'use strict';
/**
 * Require our modules
 */
const config = require('../../config/config');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');

/**
 * Export our Global Middleware
 */
module.exports = (app) => {
    app.use(helmet());
    app.use(morgan(config.env));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // Use Longjohn for stack traces
    if (config.env !== 'prd') {
        const longjohn = require('longjohn');
        longjohn.async_trace_limit = 10;
    }
    // Use Passport for JWT-Token authentication
    app.use(passport.initialize());
    require('./passport/passport')(passport);
}