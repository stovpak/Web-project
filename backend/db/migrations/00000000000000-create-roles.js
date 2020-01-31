
const roles = require('../models/user_models/role-model');

module.exports = {
  up: () => roles.roles.sync({force: true}),
  down: (queryInterface) => dropTables(queryInterface),
};
function dropTables(queryInterface) {
  queryInterface.dropTable(['Users', 'roles']);
  return queryInterface.dropTable('Roles');
}
