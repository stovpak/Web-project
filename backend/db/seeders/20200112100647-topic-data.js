
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('topics', [{
    topic_name: 'Test topic name',
    creator_name: 'Darina',
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('topics', null, {}),
};
