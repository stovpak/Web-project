const messageModel = require('../../../db/models/message_models/MessageModel.js');
const topicModel = require('../../../db/models/message_models/TopicModel.js');

function createMessage(message) {
  messageModel.create({
    author_name: message.author_name,
    topic_id: message.topic_id,
    date: message.creationDate,
  });
}
function showOldMessages(topicId) {
  return messageModel.findAll({
    raw: true,
    where: {
      topic_id: topicId,
    },
  });
}
function createTopic(topic) {
  topicModel.create({
    topic_name: topic.topicName,
    creator_name: topic.topicCreator,
  });
}
function showTopics(response) {
  topicModel.findAll({
    raw: true,
  }).then((topics) => {
    response.send(topics);
  });
}
function findTopicId(topicName) {
  return topicModel.findOne({
    raw: true,
    where: {
      topic_name: topicName,
    },
  });
}
module.exports.createMessage = createMessage;
module.exports.createTopic = createTopic;
module.exports.showTopics = showTopics;
module.exports.showOldMessages = showOldMessages;
module.exports.findTopicId = findTopicId;
