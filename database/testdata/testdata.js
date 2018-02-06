/**
 * Require our modules
 */
const config = require('../../config/config');
const logger = require('../../server/utils/logger');
const models = require('../models');
const Users = models.Users;
const UserRoles = models.UserRoles;
const UserBranches = models.UserBranches;

/**
 * @workaround because Seeders don't allow for Hooks in Sequelize-CLI 3. We need hooks to hash Passwords with BCrypt before inserting it into the DB
 * This will be available in Sequelize-CLI 4.
 * @TODO Migrate to Seed when Sequelize-CLI 4 is available
 * 
 * @description Check if we already added an admin account, otherwise build a new user
 */
Users.find({ where: { username: config.admin.username } }).then( function (user) {
    // No User found, build & insert it
    if (!user) {
        // Insert the User in the Database
        Users.build({
            firstname: config.admin.firstname,
            lastname: config.admin.lastname,
            email: config.admin.email,
            username: config.admin.username,
            password: config.admin.password,
            status: config.admin.status,
        }).save().then( ( userObject ) => {
            logger.info( 'Admin User Created. Email: ' + config.admin.email + ' - Username: ' + config.admin.username);
            // We need to set a small timeout to wait until te associations are ready...Fixed with Sequelize-CLI 4
            setTimeout(() => {
                // Build the default User Role
                UserRoles.build({
                    RoleId: config.admin.role_id,
                    UserId: userObject.id
                }).save().then( () => {
                    logger.info( 'Admin Role ID Created');
                    // Build the default User Branche
                    UserBranches.build({
                        BranchId: config.admin.branch_id,
                        UserId: userObject.id
                    }).save().then( () => {
                        logger.info( 'Admin Branch ID Created');
                    });
                });
            }, 500);
        // Error
        }, err => {
            // Log the Error
            console.log( err );
            logger.error( 'ERROR Creating Admin User for Email: ' + config.admin.email + ' - Username: ' + config.admin.username );
        });
    }
});

// Export the module
module.exports = Users;