const topicLikeModel = require('../../../db/models/message_models/topic-likes-model.js');
const topicModel = require('../../../db/models/message_models/topic-model.js');
const topicService = require('./topic-service.js');
const sequelize = require('sequelize');
const sequelizeOperators = sequelize.Op;

const moment = require('moment');

function isFirstDayOfTheMonth() {
  const date = new Date();
  return (date.getDate() === 1);
}
function doesLikesExist(Likes) {
  return !!Likes[0];
}
function findLikes(userLogin) {
  return topicLikeModel.findAll({
    where: {
      user_login: userLogin,
    },
  });
}
function findMonthlyOrWeeklyTopicLikes(searchingType, searchingValue, topics, i) {
  return topicLikeModel.findAll({
    raw: true,
    where: {
      topic_id: topics[i].id,
      date: {
        [sequelizeOperators.gte]: moment().subtract(searchingValue, searchingType).toDate(),
      },
    },
  });
}
function updateTopTopicLikes(Likes, topicId, type) {
  if (doesLikesExist(Likes)) {
    topicModel.update({[type]: Likes.length}, {
      where: {
        id: topicId,
      },
    });
  } else {
    topicModel.update({[type]: 0}, {
      where: {
        id: topicId,
      },
    });
  }
}
function countWeeklyLikes() {
  const type = 'weekly_likes_counter';
  topicService.findAllTopics().then((topics) => {
    for (let i=0; i<topics.length; i++) {
      const topicId = topics[i].id;
      findMonthlyOrWeeklyTopicLikes('days', 7, topics, i).then((Likes)=>{
        updateTopTopicLikes(Likes, topicId, type);
      });
    }
  });
}
function countMonthlyLikes() {
  if (isFirstDayOfTheMonth()) {
    const type = 'monthly_likes_counter';
    topicService.findAllTopics().then((topics) => {
      for (let i=0; i<topics.length; i++) {
        const topicId = topics[i].id;
        findMonthlyOrWeeklyTopicLikes('months', 1, topics, i).then((Likes)=>{
          updateTopTopicLikes(Likes, topicId, type);
        });
      }
    });
  } else {
    return;
  }
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
      const date = new Date();
      topicLikeModel.create({
        topic_id: topicId,
        user_login: userLogin,
        date: date,
      });
      topicModel.increment('likes', {
        by: +1,
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
module.exports.setMonthlyInterval = setMonthlyInterval;
module.exports.setWeeklyInterval = setWeeklyInterval;
module.exports.countLikes = countLikes;
module.exports.findLikes = findLikes;
module.exports.deleteLikes = deleteLikes;
module.exports.likeTopic = likeTopic;
