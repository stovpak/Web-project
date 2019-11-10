const mailValidation = require('./EmailValidation.js');
const passValidation = require('./PasswordValidation.js');
const loginValidation = require('./LoginValidation.js');


function SignInValidation(loginRequest) {
  if ((mailValidation.MailValidation(loginRequest.login) || loginValidation.LoginValidation(loginRequest.login)) && passValidation.PasswordValidation(loginRequest.password)) {
    return true;
  } else {
    return false;
  }
}
module.exports.SignInValidation = SignInValidation;
