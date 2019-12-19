const emailValidation = require('./EmailValidation.js');
const passValidation = require('./PasswordValidation.js');
const loginValidation = require('./LoginValidation.js');

function validateSignUp(registrationRequest) {
  if (emailValidation.validateEmail(registrationRequest.email) && passValidation.validatePassword(registrationRequest.password) && loginValidation.validateLogin(registrationRequest.login)) {
    return true;
  }
  return false;
}
module.exports.validateSignUp = validateSignUp;
