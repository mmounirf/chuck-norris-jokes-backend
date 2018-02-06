'use strict';
/**
 * Require our Modules
 */
const myprofile = require('express').Router();
const logger = require('../../../utils/logger');
const passport = require('passport');
const passportController = require('../../../middleware/passport/controller/passport-controller');
const controller = require('./controller/myprofile-controller');

myprofile.get('/', (req, res) => {
	// Get the loggedin User
	passportController.getLoggedInUserObject( req.headers.authorization ).then( userObject => {
		// Return the User Object
		res.status( 200 ).json({
			user : userObject
		});
	}, err => {
		// Return the Error
		res.status( 400 ).json({
			err: 'User not found!'
		});
	});
});

// Export the Myprofile
module.exports = myprofile;