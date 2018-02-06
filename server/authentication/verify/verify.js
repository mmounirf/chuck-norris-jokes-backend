'use strict';
/**
 * Require our modules
 */
const verify = require('express').Router();
const passport = require('passport');
const logger = require('../../utils/logger');

/**
 * Verify the JWT Token
 */
verify.options('/')
verify.get('/', (req, res, next) => {
    // Return that the User is Authorized
    res.status(200).json({
        msg: 'Authorized'
    });
});

// Export the Verify module
module.exports = verify;