'use strict';
module.exports = (sequelize, DataTypes) => {
  var Branches = sequelize.define('Branches', {
    name: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});

  /**
   * @description: Define Associations
   * @param {*} models 
   */
  Branches.associate = function (models) {
    Branches.belongsToMany(models.Users, { through: 'UserBranches' });
  }
  
  // Return the model
  return Branches;
};