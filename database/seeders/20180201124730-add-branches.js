'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Branches', [
      { name: 'Frontmen - Utrecht', city: 'Utrecht'},
      { name: 'Frontmen - Amsterdam', city: 'Amsterdam'},
      { name: 'Frontmen - Eindhoven', city: 'Eindhoven'},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Branches', null, {});
  }
};
