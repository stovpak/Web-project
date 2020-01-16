'use strict';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const password = bcrypt.hashSync("Password123", salt);

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      login: 'Nita',
      password: password,
      email: 'Nta@ad.erd',
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};