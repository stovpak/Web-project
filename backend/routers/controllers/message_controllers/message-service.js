const messageModel = require('../../../db/models/message_models/message-model.js');
const topicModel = require('../../../db/models/message_models/topic-model.js');
const topicLikeModel = require('../../../db/models/message_models/topic-likes-model.js');


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
function deleteLikes(topicId) {
  topicLikeModel.destroy({
    raw: true,
    where: {
      topic_id: topicId,
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
function likeTopic(topicId, userLogin) {
  topicLikeModel.findOne({
    raw: true,
    where: {
      topic_id: topicId,
      user_login: userLogin,
    },
  }).then((topicLike) => {
    if (!topicLike) {
      topicLikeModel.create({
        topic_id: topicId,
        user_login: userLogin,
      });
      topicModel.increment('likes', {
        by: 1,
        where: {
          id: topicId,
        },
      });
    } else {
      topicLikeModel.destroy({
        where: {
          topic_id: topicId,
          user_login: userLogin,
        },
      });
      topicModel.increment('likes', {
        by: -1,
        where: {
          id: topicId,
        },
      });
    }
  });
}
function countWeeklyLikes() {
  for (i = 0; i < topics.length; i++) {
    topicModel.increment('weekly_likes_counter', {by: -topics[i].likes,
      where: {
        topic_id: topics[i].id,
      },
    });
  }
}
function countMonthlyLikes() {
  const date = new Date();
  console.log('132');
  if (console.log( date.getDate() === 1)) {
    for (i = 0; i < topics.length; i++) {
      topicModel.increment('monthly_likes_counter', {
        by: -topics[i].likes,
        where: {
          topic_id: topics[i].id,
        },
      });
    }
  } else {
    return;
  }
}
function setWeeklyInterval() {
  setInterval(
      () => countWeeklyLikes(),
      604800000,
  );
}
function setMonthlyInterval() {
  setInterval(
      () => countMonthlyLikes(),
      86400000,
  );
}
function findLikes(userLogin) {
  return topicLikeModel.findAll({
    where: {
      user_login: userLogin,
    },
  });
}
function countLikes(topicId) {
  return topicModel.findOne({
    raw: true,
    where: {
      topic_id: topicId,
    },
  });
}
module.exports.setMonthlyInterval = setMonthlyInterval;
module.exports.setWeeklyInterval = setWeeklyInterval;
module.exports.countLikes = countLikes;
module.exports.findLikes = findLikes;
module.exports.deleteLikes = deleteLikes;
module.exports.likeTopic = likeTopic;
module.exports.createMessage = createMessage;
module.exports.createTopic = createTopic;
module.exports.findAllTopics = findAllTopics;
module.exports.showOldMessages = showOldMessages;
module.exports.findTopic = findTopic;
module.exports.deleteMessage = deleteMessage;
module.exports.updateMessage = updateMessage;
module.exports.deleteTopic = deleteTopic;
module.exports.findMessage = findMessage;
module.exports.clearingTopic = clearingTopic;
