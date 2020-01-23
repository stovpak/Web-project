
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [{
    role_name: 'user',
  },
  {
    role_name: 'admin',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
