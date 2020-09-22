module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('messages', [{
    author_name: 'Darina',
    topic_id: 1,
    date: '00:00:00',
    text: 'Test Text 2',
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('messages', null, {}),
};
