'use strict';
const users = require('../models/user_models/UserModel');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return users.users.sync({force: true})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};