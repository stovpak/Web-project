const messageModel = require('../../../db/models/message_models/message-model.js');

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
function findMessage(messageId) {
  return messageModel.findOne({
    raw: true,
    where: {
      id: messageId,
    },
  });
}
module.exports.createMessage = createMessage;
module.exports.showOldMessages = showOldMessages;
module.exports.deleteMessage = deleteMessage;
module.exports.updateMessage = updateMessage;
module.exports.findMessage = findMessage;
