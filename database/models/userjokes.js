'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserJokes = sequelize.define('UserJokes', {
    UserId: DataTypes.INTEGER,
    JokeId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  
  // Return the model
  return UserJokes;
};