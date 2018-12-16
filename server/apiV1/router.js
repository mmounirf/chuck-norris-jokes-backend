'use strict';
/**
 * Require our modules
 */
const router = require('express').Router();

router.use('/users/myprofile', require('./users/myprofile/myprofile'));

router.use('/users/myjokes', require('./users/myjokes/myjokes'));

// Export the module
module.exports = router;