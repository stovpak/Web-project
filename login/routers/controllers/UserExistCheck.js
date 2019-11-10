const Sequelize = require('sequelize');

const SequelizeOperators = Sequelize.Op;
const UserModel = require('../../db/models/UserModel.js');
const createUserAccount = require('../../db/CreateUserAccount.js');

function UserExist(registrationRequest, response) {
  UserModel.User.findOne({
    raw: true,
    where: {
      [SequelizeOperators.or]: [{ login: registrationRequest.login }, { email: registrationRequest.email }],
    },
  })
    .then((User) => {
      if (!User) {
        createUserAccount.createUserAccount(registrationRequest, response);
        return;
      }
      response.status(400).send('Такой пользователь уже есть');
    });
}
module.exports.UserExist = UserExist;
