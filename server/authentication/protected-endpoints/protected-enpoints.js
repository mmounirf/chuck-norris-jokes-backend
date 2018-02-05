'use strict';
/**
 * Require our modules
 * Custom interceptor for all Requests
 */
const protectedEndpoints = require('express').Router();
const config = require('../../../config/config');
const passport = require('passport');
const logger = require('../../utils/logger');
const controller = require('./controller/protected-endpoint-controller');

protectedEndpoints.get('/*', function (req, res, next) {
    // Check if the requested Endpoint is a protected Endpoint
    let isProtected = controller.isEndPointProtected(req.originalUrl);
    // Check if the Endpoint is protected
    if (isProtected) {
        // Authenticate the JWT-Token in the header
        passport.authenticate('jwt', function (err, userObject, info) {
            // Error authenticating the token
            if (err) {
                // Log the Error
                logger.error( 'Error when authenticating protected Endpoint: ' + req.originalUrl );
                // Return the Error response
                res.status(500).json({
                    status: 'Error',
                    msg: JSON.stringify(err)
                });
                // Token not valid
            } else if (!userObject) {
                // Log the Warning
                logger.warn( 'Unauthorized Error om protected Endpoint: ' + req.originalUrl );
                // Return the Unauthorized response
                res.status(401).json({
                    msg: 'Unauthorized'
                });
                // Valid Token
            } else {
                // Check if the API requires Admin rights and the User is an admin
                if( isProtected.rights === 'admin' && controller.isAdminUser( userObject ) ){
                    // Validation success, proceed to API Call
                    next();
                // The API Only needs a secure token
                } else if( isProtected.rights === ''){
                    // Validation success, proceed to API Call
                    next();
                } else {
                    // Log the Warning
                    logger.warn( userObject.email + ' requested ' + req.originalUrl + ' but doesn`t have admin rights' );
                    // Return the Forbidden response
                    res.status(403).json({
                        msg: 'Insufficient rights'
                    });
                }
            }
        })(req, res, next);
    } else {
        // Unprotected Endpoint, proceed to API Call
        next();
    }
});
protectedEndpoints.post('/*', function (req, res, next) {
    next();
});

module.exports = protectedEndpoints;