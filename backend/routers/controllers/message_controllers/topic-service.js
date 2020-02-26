const topicModel = require('../../../db/models/message_models/topic-model.js');
const messageModel = require('../../../db/models/message_models/message-model');

function createTopic(topic, response) {
  topicModel.create({
    topic_name: topic.name,
    creator_name: topic.creator,
  });
  response.status(200);
}
function findAllTopics() {
  return topicModel.findAll({
    raw: true,
  });
}
function findTopic(topicId) {
  return topicModel.findOne({
    raw: true,
    where: {
      id: topicId,
    },
  });
}
function deleteTopic(topicToDeleteId) {
  topicModel.destroy({
    raw: true,
    where: {
      id: topicToDeleteId,
    },
  });
}
function clearingTopic(topicId) {
  messageModel.destroy({
    raw: true,
    where: {
      topic_id: topicId,
    },
  });
}
function findUserTopics(userLogin) {
  return topicModel.findAll({
    raw: true,
    where: {
      creator_name: userLogin,
    },
  });
}
function findTopicsOnPage(page) {
  const limit = 10;
  const offset = (page-1) * limit;
  return topicModel.findAll({
    offset,
    limit,
    raw: true,
  });
}
function findTopTopics(type) {
  const limit = 10;
  return topicModel.findAll({
    limit,
    order: [[
      type, 'DESC'],
    ],
  });
}
module.exports.findTopTopics = findTopTopics;
module.exports.findTopicsOnPage = findTopicsOnPage;
module.exports.findUserTopics = findUserTopics;
module.exports.createTopic = createTopic;
module.exports.findAllTopics = findAllTopics;
module.exports.findTopic = findTopic;
module.exports.deleteTopic = deleteTopic;
module.exports.clearingTopic = clearingTopic;
