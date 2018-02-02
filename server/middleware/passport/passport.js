'use strict';
/**
 * Require our modules
 */
const config = require('../../../config/config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const logger = require('../../utils/logger');
const Users = require('../../../database/models').Users;

module.exports = function (passport) {
    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = config.jwt.secret;

    // Check the JWT-Token on every HTTP Request where Passport Authentication is enabled and return the user object
    passport.use(new JwtStrategy(options, function (jwt_payload, done) {
        Users.findOne({
            where: {
                id: jwt_payload.id
            }
        }).then(function (userObject) {
            // Check if we have an userObject
            if (userObject) {
                // Remove the Password from the User Object for the response
                userObject.password = undefined;
                delete userObject.password;
                logger.info( 'Passport: ' + userObject.email + ' requested an API');
                done(null, userObject);
            // No userObject
            } else {
                done(null, false);
            }
        }, function (error) {
            if (error) {
                return done(error, null);
            }
        });
    // An Error occured 
    }, function( error ){
        logger.warn( 'Passport Error: ' + JSON.stringify( error ));
    }));
}