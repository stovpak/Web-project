'use strict';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const password = bcrypt.hashSync("A1267ddc", salt);

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      login: 'Darina',
      password: password,
      email: 'Piska@ad.erd',
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
