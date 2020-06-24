
const restorePasswordKeyModel = require('../models/user_models/restore-password-key-model');

module.exports = {
  up: () => restorePasswordKeyModel.sync({force: true}),
  down: (queryInterface) => dropTables(queryInterface),
};
function dropTables(queryInterface) {
  return queryInterface.dropTable('Restore-keys');
}
