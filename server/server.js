'use strict';
/**
 * Require our modules
 */
const express = require('express');
// Set the App
const app = express();
// Require our Main API Router
const apiV1 = require('./apiV1/router');
// Require our Global Middleware
require( './middleware/middleware' )(app);

/**
 * Generic API's
 */

// Use protected Endpoints
app.use( '/', require( './authentication/protected-endpoints/protected-enpoints' ) );

// Login
const login = require('./authentication/login/login');
app.use('/login', login);

// Verify Login
const verify = require('./authentication/verify/verify');
app.use('/login/verify', verify);

// Healthcheck
const healthcheck = require('./healthcheck/healthcheck');
app.use('/healthcheck', healthcheck);

// Caching
const caching = require('./caching/caching');
app.use('/cache', caching);

// Server info
const serverinfo = require('./serverinfo/serverinfo');
app.use('/serverinfo', serverinfo);

// Add all the API - Version 1
app.use('/api/v1', apiV1);

// Export the app
module.exports = app;
