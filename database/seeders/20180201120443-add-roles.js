'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      { name: 'Unknown', isAdmin: false },
      { name: 'Administrator', isAdmin: true },
      { name: 'Editor', isAdmin: false },
      { name: 'Member', isAdmin: false }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
