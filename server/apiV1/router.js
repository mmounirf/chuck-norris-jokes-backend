'use strict';
/**
 * Require our modules
 */
const router = require('express').Router();

// router.use('/some-route', require('./some/module'));
router.use('/users/myprofile', require('./users/myprofile/myprofile'));

// Export the module
module.exports = router;