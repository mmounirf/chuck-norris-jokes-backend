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
verify.get('/', function( req, res, next) {
    // Authenticate the JWT-Token in the header
    passport.authenticate('jwt', function( err, user, info) {
        // Error authenticating the token
        if (err) { 
            return next(err);
        // Token not valid
        } else if (!user) { 
            return res.status(401).json({
                msg: 'Unauthorized'
            }); 
        // Valid Token
        } else {
            res.status(200).json({
                msg: 'Authorized'
            });
        }
    })(req, res, next);
});

// Export the Verify module
module.exports = verify;