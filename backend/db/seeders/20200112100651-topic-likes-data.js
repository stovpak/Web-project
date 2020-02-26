
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('topic-likes', [{
    topic_id: 1,
    user_login: 'Darina',
    date: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('topic-likes', null, {}),
};
