const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const userModel = require('../../../db/models/user_models/UserModel.js');

const sequelizeOperators = sequelize.Op;


const salt = bcrypt.genSaltSync(10);

function createUserAccount(registrationRequest, response) {
  const password = bcrypt.hashSync(registrationRequest.password, salt);
  userModel.user.create({
    login: registrationRequest.login,
    email: registrationRequest.email,
    password,
  });
  response.status(200).send('Вы успешно зарегестрировались');
}
function exists(login, email) {
  return userModel.user.findOne({
    raw: true,
    where: {
      [sequelizeOperators.or]: [{ login }, { email }],
    },
  });
}
module.exports.createUserAccount = createUserAccount;
module.exports.exists = exists;
