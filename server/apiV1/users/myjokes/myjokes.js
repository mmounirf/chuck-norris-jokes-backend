'use strict';
/**
 * Require our Modules
 */
const myjokes = require('express').Router();
const models = require('../../../../database/models');
const passportController = require('../../../middleware/passport/controller/passport-controller');

const Jokes = models.Jokes;
const Users = models.Users;

myjokes.get('/', (req, res) => {
	// Get the logged in User
	passportController.getLoggedInUserObject( req.headers.authorization ).then( userObject => {
		//TODO: Get all jokes associated with this user id
		res.status( 200 ).json({
			user : userObject
		});
	}, err => {
		// Return the Error
		res.status( 400 ).json({
			err: 'Unauthorized'
		});
	});
});

// Add joke to jokes table and assign to user
myjokes.post('/', (req, res, next) => {
	// Get logged in user
	passportController.getLoggedInUserObject( req.headers.authorization ).then( userObject => {
		// Check if the request body is valid
		if (req.body.joke && req.body.id) {
			Jokes.findOrCreate({
				where: {id: req.body.id},
				defaults: {joke: req.body.joke, id: req.body.id}
			}).spread((joke, created) => {
				//TODO: Should set association of joke to user in usersJokes table				
				res.status( 200 ).json({
					joke: joke,
					created : created
				});
			});
		} else {
			res.status(400).json({
				err: 'Invalid joke payload'
			});
		}
	}, err => {
		// Return the Error
		res.status( 400 ).json({
			err: 'Unauthorized'
		});
	});

});

// Export the Userjokes
module.exports = myjokes;