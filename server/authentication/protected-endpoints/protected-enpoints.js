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

/**
 * @name validateRequest
 * @description Method to intercept all requests to see if the Endpoint is protected, the JWT-Token is valid and the permissions are ok
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function validateRequest( req, res, next ){
    // Check if the requested Endpoint is a protected Endpoint
    let isProtected = controller.isEndPointProtected(req.originalUrl);
    // Check if the Endpoint is protected
    if (isProtected) {
        // Authenticate the JWT-Token in the header
        passport.authenticate('jwt', {
            session: false
        }, (err, user, info) => {
            // Check if we have an error
            if ( err ) {
                // Log the Error
                logger.error('Error when authenticating protected Endpoint: ' + req.originalUrl);
                // Return the Error response
                res.status(500).json({
                    err: 'Internal Server Error'
                });
            } else if( !err && !user && !info.name ){
                // Return that 
                res.status( 401 ).json({
                    err: 'Unauthorized'
                });
            // Check if we have an Info Message
            } else if (info) {
                // Token Expired
                if (info.name === 'TokenExpiredError') {
                    // Log the Warning
                    logger.warn('Token Expired on request: ' + req.originalUrl);
                    // Return the Unauthorized response
                    res.status(400).json({
                        err: 'JWT-Token Expired'
                    });
                } else {
                    // Log the Warning
                    logger.warn('Invalid Token on request: ' + req.originalUrl);
                    // Return the Unauthorized response
                    res.status(400).json({
                        err: 'JWT-Token Invalid'
                    });
                }
            // Check if we have a User Object
            } else if (user) {
                // Check if the API requires Admin rights and the User is an admin
                if (isProtected.rights === 'admin' && controller.isAdminUser(user)) {
                    // Validation success, proceed to API Call
                    next();
                    // The API Only needs a secure token
                } else if (isProtected.rights === '') {
                    // Validation success, proceed to API Call
                    next();
                } else {
                    // Log the Warning
                    logger.warn(user.email + ' requested ' + req.originalUrl + ' but doesn`t have admin rights');
                    // Return the Forbidden response
                    res.status(403).json({
                        err: 'Insufficient rights'
                    });
                }
            } else {
                //@TODO: What to do here?
                // Return the  response
                res.status(500).json({
                    err: 'Some error on the Protection of Endpoints'
                });
            }
        })(req, res, next);
    } else {
        // Unprotected Endpoint, proceed to API Call
        next();
    }
}

// GET Requests
protectedEndpoints.get('/*', (req, res, next) => {
    validateRequest( req, res, next );
});
// POST Requests
protectedEndpoints.post('/*', (err, req, res, next) => {
    validateRequest( req, res, next );
});
// PUT Requests
protectedEndpoints.put('/*', (err, req, res, next) => {
    validateRequest( req, res, next );
});
// DELETE Requests
protectedEndpoints.delete('/*', (err, req, res, next) => {
    validateRequest( req, res, next );
});

// Export protected Endpoints
module.exports = protectedEndpoints;