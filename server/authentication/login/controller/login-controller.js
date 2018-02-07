'use strict';
/**
 * Require our modules
 */
const Op = require('Sequelize').Op;
const models = require('../../../../database/models');
const Users = models.Users;

module.exports = {
    // Verify if a username or email is found in the database
    findUser: ( user ) => {
        return new Promise( (resolve, reject) => {
            // Find a single user by username or email
            Users.findOne({
                // Include models
                include: [
                    { model: models.Roles, attributes: ['id', 'name', 'isAdmin'] },
                    { model: models.Branches, attributes: [ 'id', 'name', 'city'] }
                ],
                where: {
                    [Op.or]: [{username: user}, {email: user}]
                }
            }).then(userObject => {
                // Check if we have a User Object
                if( userObject ){
                    resolve( userObject )
                } else {
                    reject();
                }
            });
        });

    },
    // Verify if the given password matches the hashed password in the database
    verifyPassword: ( password, userPassword ) => {
        return new Promise( (resolve, reject) => {
            // Compare the Password with the DB Password
            Users.comparePassword(password, userPassword, (isMatch, error) => {
                // Passwords match
                if( isMatch && !error ){
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }
}