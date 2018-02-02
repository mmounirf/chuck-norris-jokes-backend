'use strict';
module.exports = (sequelize, DataTypes) => {
  var Roles = sequelize.define('Roles', {
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  /**
   * @description: Define Associations
   * @param {*} models 
   */
  Roles.associate = function (models) {
    Roles.belongsToMany(models.Users, { through: 'UserRoles' });
  }
  
  // Return the model
  return Roles;
};