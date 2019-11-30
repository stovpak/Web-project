const Sequelize = require('sequelize');

const SequelizeOperators = Sequelize.Op;
const UserModel = require('../../../db/models/user_models/UserModel.js');
const createUserAccount = require('../../../routers/controllers/user_controllers/UserServices.js');

function CopyCheck(registrationRequest, response) {
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
      response.status(409).send('Такой пользователь уже есть');
    });
}
module.exports.CopyCheck = CopyCheck;
