'use strict';
/**
 * Require our modules
 */
const config = require('../../../config/config');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const logger = require('../../utils/logger');
const controller = require('./controller/passport-controller');

module.exports = (passport) => {
    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = config.jwt.secret;

    // Check the JWT-Token on every HTTP Request where Passport Authentication is enabled and return the user object
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        
        // Get the User From the Database by GUID
        controller.getUserFromDB(jwt_payload.guid).then(userObject => {
            // Check if we have an userObject
            if (userObject) {
                // Remove the Password from the User Object for the response
                userObject.password = undefined;
                delete userObject.password;
                logger.info('Passport: ' + userObject.email + ' requested an API');
                done(null, userObject);
                // No userObject
            } else {
                done(null, false);
            }
        }, err => {
            done(err, null);
        });
        // An Error occured 
    }, (error) => {
        logger.warn('Passport Error: ' + JSON.stringify(error));
    }));
}