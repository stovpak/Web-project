
const topicLike = require('../models/message_models/topic-likes-model.js');

module.exports = {
  up: () => topicLike.sync({force: true}),
  down: (queryInterface) => queryInterface.dropTable('topic-likes'),
};
