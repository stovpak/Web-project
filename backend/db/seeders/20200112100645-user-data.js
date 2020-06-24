
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);
const password = bcrypt.hashSync('Password123', salt);

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    login: 'Nita',
    password,
    email: 'Nta@ad.erd',
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
