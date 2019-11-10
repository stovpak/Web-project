const emailValidation = require('./EmailValidation.js');
const passValidation = require('./PasswordValidation.js');
const loginValidation = require('./LoginValidation.js');

function SignUpValidation(registrationRequest) {
  if (emailValidation.MailValidation(registrationRequest.email) && passValidation.PasswordValidation(registrationRequest.password) && loginValidation.LoginValidation(registrationRequest.login)) {
    return true;
  } else {
    return false;
  }
}
module.exports.SignUpValidation = SignUpValidation;
