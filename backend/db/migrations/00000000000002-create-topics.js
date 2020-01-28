
const topics = require('../models/message_models/topic-model');

module.exports = {
  up: () => topics.sync({ force: true }),
  down: (queryInterface) => queryInterface.dropTable('topics'),
};
