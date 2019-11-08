const mailValidation = require('./MailValidation.js');
const passValidation = require('./PasswordValidation.js');
const loginValidation = require('./LoginValidation.js');
const CreateUser = require('../../db/UserResponseServices.js');


function SignInValidation(loginRequest, response) {
  if ((mailValidation.MailValidation(loginRequest.login) || loginValidation.LoginValidation(loginRequest.login)) && passValidation.PasswordValidation(loginRequest.password)) {
    CreateUser.SignIn(loginRequest, response);
  } else {
    response.send('Данные введены неправильно');
  }
}
module.exports.SignInValidation = SignInValidation;
