
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('topic-likes', [{
    topic_id: 1,
    user_login: 'Darina',
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('topic-likes', null, {}),
};
