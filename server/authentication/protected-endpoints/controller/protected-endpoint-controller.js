'use strict';
/**
 * Require our modules
 */
const config = require('../../../../config/config');
const _ = require('lodash');

// passport.authenticate('jwt', { session: false })

const self = module.exports = {
    /**
     * @name isEndPointProtected
     * @description Get the Protected Endpoint from the Config
     */
    isEndPointProtected: (endpoint) => {
        // Find the Entry in the config.protectedEndpoints
        return _.find(config.protectedEndpoints, ['uri', endpoint]);
    },
    /**
     * @name isAdminUser
     * @description Find in the userObject if the User is as admin
     */
    isAdminUser: ( userObject ) => {
        return _.findIndex(userObject.Roles, ['isAdmin', true]) !== -1;
    }
};