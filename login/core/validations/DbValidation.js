const Sequelize = require('sequelize');

const SequelizeOperators = Sequelize.Op;
const UserModel = require('../../db/models/UserModel.js');
const createUserAccount = require('../../db/CreateUserAccount.js');

function CopyCheck(registrationRequest, response) {
  UserModel.User.findOne({
    raw: true,
    where: {
      [SequelizeOperators.or]: [{ login: registrationRequest.login }, { mail: registrationRequest.mail }],
    },
  })
    .then((User) => {
      if (!User) {
        createUserAccount.createUserAccount(registrationRequest, response);
        return;
      }
      response.send('Такой пользователь уже есть');
    });
}
module.exports.CopyCheck = CopyCheck;
