
const users = require('../models/user_models/user-model');

module.exports = {
  up: () => users.user.sync({force: true}),
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
