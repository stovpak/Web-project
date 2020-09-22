
const messages = require('../models/message_models/message-model');

module.exports = {
  up: () => messages.sync({force: true}),
  down: (queryInterface) => queryInterface.dropTable('messages'),
};
