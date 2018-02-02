'use strict';
/**
 * Require our modules
 */
const caching = require('express').Router();
const logger = require('../utils/logger');
const passport = require('passport');
const passportController = require('../middleware/passport/controller/passport-controller');
const cacheController = require('./controller/caching-controller');

/**
 * @description Clear the Cache
 * @TODO We might want to secure this API ;)
 * @method GET
 * @example http://localhost:3000/cache/clear
 */
caching.get('/clear', passport.authenticate('jwt', { session: false }), function (req, res) {
	// Get the loggedin User
	passportController.isAdminUser(req.headers.authorization).then( isAdmin => {
		// Check if the user is an Admin
		if ( isAdmin ) {
			// Clear the cache
			cacheController.clearCache().then(() => {
				res.json({
					status: 'OK',
					msg: 'Cache cleared'
				});
			}, err => {
				res.json({
					status: 500,
					msg: 'Cache could not be cleared'
				});
			});
		}
	}, err => {
		// Return the Error that the user has no rights
		res.status(401).json({
			err: 'No rights to clear cache!'
		});
	});
});

// Export the module
module.exports = caching;