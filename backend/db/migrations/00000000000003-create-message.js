
const messages = require('../models/message_models/MessageModel');

module.exports = {
  up: () => messages.sync({ force: true }),
  down: (queryInterface) => queryInterface.dropTable('messages'),
};
