const messageModel = require('../../../db/models/message_models/message-model.js');
const topicModel = require('../../../db/models/message_models/topic-model.js');

function createMessage(message) {
  messageModel.create({
    author_name: message.author_name,
    topic_id: message.topicId,
    date: message.creationDate,
    text: message.text,
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
function createTopic(topic, response) {
  topicModel.create({
    topic_name: topic.name,
    creator_name: topic.creator,
  });
  response.status(200);
}
function showTopics(response) {
  topicModel.findAll({
    raw: true,
  }).then((topics) => {
    response.send(topics);
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
function deleteMessage(messageToDeleteId) {
  messageModel.destroy({
    raw: true,
    where: {
      id: messageToDeleteId,
    },
  });
}
function updateMessage(messageToUpdateId, messageText) {
  messageModel.update({text: messageText}, {
    raw: true,
    where: {
      id: messageToUpdateId,
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
function findMessage(messageId) {
  return messageModel.findOne({
    raw: true,
    where: {
      id: messageId,
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
module.exports.createMessage = createMessage;
module.exports.createTopic = createTopic;
module.exports.showTopics = showTopics;
module.exports.showOldMessages = showOldMessages;
module.exports.findTopic = findTopic;
module.exports.deleteMessage = deleteMessage;
module.exports.updateMessage = updateMessage;
module.exports.deleteTopic = deleteTopic;
module.exports.findMessage = findMessage;
module.exports.clearingTopic = clearingTopic;
