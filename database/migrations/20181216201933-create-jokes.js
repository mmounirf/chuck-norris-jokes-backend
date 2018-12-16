'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Jokes', {
      id: {
        allowNull: false,
        autoIncrement: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      joke: {
        type: Sequelize.STRING,
        unique: false,
        notEmpty: true,
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
    return queryInterface.dropTable('Jokes');
  }
};