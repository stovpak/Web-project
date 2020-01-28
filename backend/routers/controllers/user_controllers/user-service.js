const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const userModel = require('../../../db/models/user_models/user-model.js');
const passwordValidator = require('../../../core/validations/user_validation/password-validation.js');
const emailValidation = require('../../../core/validations/user_validation/email-validation.js');

const sequelizeOperators = sequelize.Op;


const salt = bcrypt.genSaltSync(10);

function createAccount(registrationRequest, response) {
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
function updatePersonalData(request, response) {
  userModel.user.update({ first_name: request.body.firstName, second_name: request.body.secondName, birthday: request.body.birthday }, {
    where: {
      login: request.body.login,
    },
  });
  response.status(200).send('Данные обновлены');
}
function changePassword(request, response) {
  const { password } = request.body;
  if (passwordValidator.validatePassword(password)) {
    const passwordToWrite = bcrypt.hashSync(password, salt);
    userModel.user.update({ password: passwordToWrite }, {
      where: {
        login: request.body.login,
      },
    });
    response.status(200).send('Данные обновлены');
  } else {
    response.status(400).send('Неправильные данные');
  }
}
function changeEmail(request, response) {
  const { email } = request.body;
  if (emailValidation(email)) {
    userModel.user.update({ email }, {
      where: {
        login: request.body.login,
      },
    });
    response.status(200).send('Данные обновлены');
    return;
  }

  response.status(400).send('Неправильные данные');
}
function findUser(userLogin) {
  return userModel.user.findOne({
    raw: true,
    where: {
      login: userLogin,
    },
  });
}
module.exports.createAccount = createAccount;
module.exports.exists = exists;
module.exports.updatePersonalData = updatePersonalData;
module.exports.changePassword = changePassword;
module.exports.changeEmail = changeEmail;
module.exports.findUser = findUser;
