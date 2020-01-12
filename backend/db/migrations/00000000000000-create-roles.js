'use strict';
const roles = require('../models/user_models/RoleModel');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return roles.roles.sync({force: true})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Roles');
  }
};