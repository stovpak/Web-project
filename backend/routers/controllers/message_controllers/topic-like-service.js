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
    for (let i=0; i<topics.length; i++) {
      const topicId = topics[i].id;
      topicLikeModel.findAll({
        raw: true,
        where: {
          topic_id: topics[i].id,
          is_weekly: true,
        },
      }).then((Likes)=>{
        if (Likes[0]) {
          topicModel.update({weekly_likes_counter: Likes.length}, {
            where: {
              id: topicId,
            },
          });
          for (let j=0; j<Likes.length; j++) {
            topicLikeModel.update({is_weekly: false}, {
              raw: true,
              where: {
                id: Likes[j].id,
              },
            });
          }
        } else {
          topicModel.update({weekly_likes_counter: 0}, {
            where: {
              id: topicId,
            },
          });
        }
      });
    }
  });
}
function countMonthlyLikes() {
  const date = new Date();
  if (date.getDate() === 1) {
    topicService.findAllTopics().then((topics) => {
      for (let i=0; i<topics.length; i++) {
        const topicId = topics[i].id;
        topicLikeModel.findAll({
          raw: true,
          where: {
            topic_id: topics[i].id,
            is_monthly: true,
          },
        }).then((Likes)=>{
          if (Likes[0]) {
            topicModel.update({monthly_likes_counter: Likes.length}, {
              where: {
                id: topicId,
              },
            });
            for (let j=0; j<Likes.length; j++) {
              topicLikeModel.update({is_monthly: false}, {
                raw: true,
                where: {
                  id: Likes[j].id,
                },
              });
            }
          } else {
            topicModel.update({weekly_likes_counter: 0}, {
              where: {
                id: topicId,
              },
            });
          }
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
module.exports.setMonthlyInterval = setMonthlyInterval;
module.exports.setWeeklyInterval = setWeeklyInterval;
module.exports.countLikes = countLikes;
module.exports.findLikes = findLikes;
module.exports.deleteLikes = deleteLikes;
module.exports.likeTopic = likeTopic;
