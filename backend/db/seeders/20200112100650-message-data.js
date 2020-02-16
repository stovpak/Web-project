module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('messages', [{
    topic_id: 1,
    author_name: 'Darina',
    date: '00-00-00',
    text: 'Test Text 1',
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('messages', null, {}),
};
