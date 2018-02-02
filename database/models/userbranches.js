'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserRoles = sequelize.define('UserBranches', {
    BranchId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  
  // Return the model
  return UserRoles;
};