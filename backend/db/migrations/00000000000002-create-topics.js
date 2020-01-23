
const topics = require('../models/message_models/TopicModel');

module.exports = {
  up: () => topics.sync({ force: true }),
  down: (queryInterface) => queryInterface.dropTable('topics'),
};
