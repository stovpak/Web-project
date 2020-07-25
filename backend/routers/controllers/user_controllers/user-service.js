const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const userModel = require('../../../db/models/user_models/user-model.js');
const passwordValidator = require('../../../core/validations/user_validation/password-validation.js');
const emailValidation = require('../../../core/validations/user_validation/email-validation.js');
const jwtService = require('../user_controllers/jwt-service.js');
const nodemailer = require('nodemailer');
const restorePasswordKeyModel = require('../../../db/models/user_models/restore-password-key-model.js');
require('dotenv').config();

const sequelizeOperators = sequelize.Op;

const salt = bcrypt.genSaltSync(10);
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function createAccount(registrationRequest, response) {
  const password = bcrypt.hashSync(registrationRequest.password, salt);
  userModel.user.create({
    login: registrationRequest.login,
    email: registrationRequest.email,
    password,
  });
  response.status(200).send();
}
function exists(login, email) {
  return userModel.user.findOne({
    raw: true,
    where: {
      [sequelizeOperators.or]: [{login}, {email}],
    },
  });
}
function updatePersonalData(request, response) {
  userModel.user.update({first_name: request.body.firstName,
    second_name: request.body.secondName,
    birthday: request.body.birthday}, {
    where: {
      login: request.body.login,
    },
  });
  response.status(200).send();
}
function changePassword(request, response) {
  const autHeader = request.get('Token');
  const login = jwtService.getLogin(autHeader);
  const {password} = request.body;
  if (passwordValidator.validatePassword(password)) {
    const passwordToWrite = bcrypt.hashSync(password, salt);
    userModel.user.update({password: passwordToWrite}, {
      where: {
        login,
      },
    });
    response.status(200).send('Данные обновлены');
  } else {
    response.status(400).send('Неправильные данные');
  }
}
function changeEmail(request, response) {
  const autHeader = request.get('Token');
  const login = jwtService.getLogin(autHeader);
  const {email} = request.body;
  if (emailValidation.validateEmail(email)) {
    userModel.user.update({email}, {
      where: {
        login,
      },
    });
    response.status(200).send();
    return;
  }
  response.status(400).send();
}
function findUser(userLogin) {
  return userModel.user.findOne({
    raw: true,
    where: {
      login: userLogin,
    },
  });
}
function restorePassword(request, response) {
  if (passwordValidator(request.body.password)) {
    userModel.user.update({password: request.body.password}, {
      raw: true,
      where: {
        email: request.body.email,
      },
    });
    deleteRestoreKey(request.body.email);
    response.status(200).send();
  } else {
    response.status(400).send();
  }
}
function sendEmail(addressee, subject, text) {
  const message = {
    from: process.env.EMAIL_NAME,
    to: addressee,
    subject: subject,
    text: text,
  };
  transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}
function createRestoreKey(email) {
  const key = bcrypt.hashSync(email, salt);
  restorePasswordKeyModel.create({
    key: key,
    email: email,
  });
  return key;
}
function deleteRestoreKey(email) {
  restorePasswordKeyModel.destroy({
    where: {
      email: email,
    },
  });
}
module.exports.deleteRestoreKey = deleteRestoreKey;
module.exports.createRestoreKey = createRestoreKey;
module.exports.sendEmail = sendEmail;
module.exports.restorePassword = restorePassword;
module.exports.createAccount = createAccount;
module.exports.exists = exists;
module.exports.updatePersonalData = updatePersonalData;
module.exports.changePassword = changePassword;
module.exports.changeEmail = changeEmail;
module.exports.findUser = findUser;
