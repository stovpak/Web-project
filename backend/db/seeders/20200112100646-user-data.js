
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);
const password = bcrypt.hashSync('A1267ddc', salt);

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    login: 'Darina',
    password,
    email: 'Darina@ad.erd',
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
