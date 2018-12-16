'use strict';
module.exports = (sequelize, DataTypes) => {
  var Jokes = sequelize.define('Jokes', {
    id: {
      allowNull: false,
      autoIncrement: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
	  joke: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  /**
   * @description: Define Associations
   * @param {*} models 
   */
  Jokes.associate = function (models) {
    Jokes.belongsToMany(models.Users, { through: 'UserJokes' });
  }
  
  // Return the model
  return Jokes;
};