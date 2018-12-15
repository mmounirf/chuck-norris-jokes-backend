'use strict';
/**
 * Require our Modules
 */
const jokes = require('express').Router();
const extRequest = require('request-promise-native');

jokes.get('/:number*?', (req, res) => {
	// Trigger external request based on the provided paramater
	if(req.params.number) {
		var request = extRequest({uri: `http://api.icndb.com/jokes/random/${req.params.number}?escape=javascript`, json: true});
	} else {
		var request = extRequest({uri: 'http://api.icndb.com/jokes/random/10?escape=javascript', json: true});
	}

	request.then((extResponse) => {
		// Request fulfilled, set jokes endpoint response
		res.status(200).json({
			data: extResponse.value,
			status: 'OK',
			timestamp: new Date().getTime()
		});
    }).catch((err) => {
		// Error occured in the external request
		res.status(502).json({
			message: 'jokes API error',
			status: 'error',
			timestamp: new Date().getTime()
		});
    });
});

// Export the HealthCheck
module.exports = jokes;