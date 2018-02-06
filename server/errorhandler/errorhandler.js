'use strict';
/**
 * Require our Modules
 */
const errorhandler = require('express').Router();
const logger = require('../utils/logger');

// Define our Variables
let errorMsg;

module.exports = (app) => {
    // Capture all request that haven't been handled
    // Get Requests
    app.get('*', (req, res, next) => {
        var err = new Error();
        err.status = 404;
        next(err);
    });
    // Post Requests
    app.post('*', (req, res, next) => {
        var err = new Error();
        err.status = 404;
        next(err);
    });
    // Put Requests
    app.put('*', (req, res, next) => {
        var err = new Error();
        err.status = 404;
        next(err);
    });
    // Delete Requests
    app.delete('*', (req, res, next) => {
        var err = new Error();
        err.status = 404;
        next(err);
    });

    // Error handler
    app.use((err, req, res, next) => {
        // Switch between statusses
        switch( err.status ){
            // Error400
            case 400:
                errorMsg = 'Bad request';
            // Error401
            case 401:
                errorMsg = 'Unauthorized';
            // Error404
            case 404:
                errorMsg = 'Not found';
            break;
            // Error 500
            case 500:
                errorMsg = 'Internal Server Error';
            break;
            // Default
            default: 
                errorMsg = 'Default Error Message';
            break;
        }
        // Return the Response
        res.status( err.status ).json({
            err: 'Error ' + err.status,
            method: req.method,
            msg: errorMsg,
            request_url: req.headers.host + req.originalUrl,
            timestamp: Math.round(new Date().getTime()/1000)
        });
    });
}

