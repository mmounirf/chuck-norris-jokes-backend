'use strict';
/**
 * Require our modules
 */
const config = require('../../config/config');
const bcrypt = require('bcrypt-nodejs');

/**
 * hashPassword
 * @description Has a Password with Bcrypt
 * @param {*} user 
 * @param {*} salt 
 */
function hashPassword(user, salt) {
	return new Promise((resolve, reject) => {
		// Create a random Salt
		const salt = bcrypt.genSalt(config.database.pw_salt_factor, function (error, salt) {
			return salt;
		});
		// Encrypt the password
		bcrypt.hash(user.password, salt, null, function (error, hash) {
			if (error) {
				reject(error)
			} else {
				resolve(hash);
			}
		});
	})
}

module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('Users', {
		guid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		username: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		status: {
			type: DataTypes.ENUM(['active', 'inactive']),
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	}, {});

	/**
	 * Associations
	 * @param {*} models 
	 */
	Users.associate = function (models) {
		Users.belongsToMany(models.Roles, { through: 'UserRoles' });
		Users.belongsToMany(models.Branches, { through: 'UserBranches' });
	}
	/**
	 * Compare hashed passwords
	 */
	Users.comparePassword = function comparePassword(password, passwd, done) {
		bcrypt.compare(password, passwd, function (error, isMatch) {
			if (error) {
				return done(false, error);
			}
			return done(isMatch, false);
		});
	}
	/**
	 * Before creating and inserting a new user, hash the password
	 */
	Users.beforeCreate((user, options) => {
		return hashPassword(user).then(function (result) {
			user.password = result;
		});
	});
	/**
	 * Before updating a user, hash the password
	 */
	Users.beforeUpdate((user, options) => {
		return hashPassword(user).then(function (result) {
			user.password = result;
		});
	});

	// Return the model
	return Users;
};