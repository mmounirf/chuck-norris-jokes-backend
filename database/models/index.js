'use strict';
/**
 * Require our Modules
 */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Define our variables
const basename = path.basename(__filename);
const config = require('../../config/config');
const db = {};

// Define a new Sequelize Object
const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, config.database);

/**
 * @name fs.readdirSync
 * @description Read the model files in the current dir 
 * For each file in the dir expect this (index.js) file, create a new model and add any associations
 */
fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

// Get the Associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Create our associations
sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
