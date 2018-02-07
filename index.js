/**
 * Require our modules
 */
const config = require('./config/config');
const app = require('./server/server');
const logger = require('./server/utils/logger');
const fs = require('fs');

/**
 * For Development purposes, insert an admin user
 */
if( config.env === 'dev'){
    require('./database/testdata/testdata');
}


/**
 * HTTP Server
 * Start the HTTP-Server if it is enabled in the config
 */
if (config.server.enableHTTP) {
    app.listen(config.server.http.port);
}

/**
 * HTTPS Server
 * Start the HTTPS-Server if it is enabled in the config
 */
if (config.server.enableHTTPS) {
    // Define the SSL Options
    const sslOptions = {
        cert: fs.readFileSync(config.server.https.fullchainPath),
        key: fs.readFileSync(config.server.https.privatekeyPath)
    };
    https.createServer(sslOptions, app).listen(config.server.https.port);
}

module.exports = app;