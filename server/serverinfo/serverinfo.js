'use strict';
/**
 * Require our Modules
 */
const serverinfo = require('express').Router();
const logger = require('../utils/logger');
const controller = require('./controller/serverinfo-controller');

serverinfo.get('/', (req, res) => {
    // Return a status 200 and a Timestamp
	res.status(200).json({
		status: 'OK',
		timestamp: new Date().getTime()
	});
});

// Export the Server info
module.exports = serverinfo;