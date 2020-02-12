
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('topic-likes', [{
    topic_name: 'Test topic name 2',
    creator_name: 'Darina',
    likes: 0,
    weekly_likes_counter: 0,
    monthly_likes_counter: 0,
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('topic-likes', null, {}),
};
