'use strict';
/**
 * Required modules
 */
const _ = require('lodash');
// Define our variables
let config = {};
let envConfig = {};
let configToExport = {};

/**
 * Define the global config for every environment that will be merged with environment specific config files
 */
config = {
  dev: 'dev',
  acc: 'acc',
  tst: 'tst',
  prd: 'prd',
  port: process.env.PORT || 3000
};
// Define our protected Endpoint
config.protectedEndpoints = [
  { uri : '/cache/clear', rights: 'admin' },
  { uri : '/login/verify', rights: '' },
  { uri : '/users/myprofile', rights: '' },
];


// Set the proces.env.NODE_ENV, if it does exist use the default (dev)
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

// Check if the set process.env.NODE_ENV is available in de config Object
if ( !config.hasOwnProperty( process.env.NODE_ENV )) {
  // We don't have the logger available so use the console
  console.warn('You`re NODE_ENV value (' + process.env.NODE_ENV + ') is unsupported by this Application and we defaulted to the config settings for: `' + config.dev + '`');
  console.warn('Please use one of the supported values defined in the config object in the ./config/config.js file');
  process.env.NODE_ENV = config.dev;
}

// Set the config.env
config.env = process.env.NODE_ENV;

/**
 * Try to load the envConfig file for the Environment
 */
try{
  envConfig = require('./' + config.env );
  envConfig = envConfig || {};
} catch( e ){
  envConfig = {};
}

/**
 * Merge the generic config file & the environment specific config file
 */
configToExport = _.merge(config, envConfig);
configToExport.autodetect = configToExport.database;

// Export the config
module.exports = configToExport;