const topicLikeModel = require('../../../db/models/message_models/topic-likes-model.js');
const topicModel = require('../../../db/models/message_models/topic-model.js');
const topicService = require('./topic-service.js');
function findLikes(userLogin) {
  return topicLikeModel.findAll({
    where: {
      user_login: userLogin,
    },
  });
}
function countWeeklyLikes() {
  topicService.findAllTopics().then((topics) => {
    for (i = 0; i < topics.length; i++) {
      topicModel.increment('weekly_likes_counter', {by: -topics[i].likes,
        where: {
          topic_id: topics[i].id,
        },
      });
    }
  });
}
function countMonthlyLikes() {
  const date = new Date();
  if (console.log( date.getDate() === 1)) {
    topicService.findAllTopics().then((topics) =>{
      for (i = 0; i < topics.length; i++) {
        topicModel.increment('monthly_likes_counter', {
          by: -topics[i].likes,
          where: {
            topic_id: topics[i].id,
          },
        });
      }
    });
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
function countLikes(topicId) {
  return topicModel.findOne({
    raw: true,
    where: {
      topic_id: topicId,
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
module.exports.setMonthlyInterval = setMonthlyInterval;
module.exports.setWeeklyInterval = setWeeklyInterval;
module.exports.countLikes = countLikes;
module.exports.findLikes = findLikes;
module.exports.deleteLikes = deleteLikes;
module.exports.likeTopic = likeTopic;
