
const users = require('../models/user_models/UserModel');

module.exports = {
  up: () => users.user.sync({ force: true }),
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
