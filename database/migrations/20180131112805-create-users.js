'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        notEmpty: true,
        allowNull: false
      },
      firstname: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true
        },
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        },
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM(['active', 'inactive']),
        defaultValue: 'active',
        allowNull: false
      },
      createdAt: { 
        allowNull: false,
        type: Sequelize.DATE(),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE(),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};