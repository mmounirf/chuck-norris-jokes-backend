'use strict';
/**
 * Require our Modules
 */
const healthcheck = require('express').Router();
const logger = require('../utils/logger');

healthcheck.get('/', (req, res) => {
    // Return a status 200 and a Timestamp
	res.status(200).json({
		status: 'OK',
		timestamp: new Date().getTime()
	});
});

healthcheck.post('/', (req, res) => {
    // Return a status 200 and a Timestamp
	res.status(200).json({
		status: 'OK',
		timestamp: new Date().getTime()
	});
});

// Export the HealthCheck
module.exports = healthcheck;