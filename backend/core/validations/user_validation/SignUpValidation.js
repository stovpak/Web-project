const emailValidation = require('./EmailValidation.js');
const passValidation = require('./PasswordValidation.js');
const loginValidation = require('./LoginValidation.js');

function validateSignUp(registrationRequest) {
  return !!(emailValidation.validateEmail(registrationRequest.email) && passValidation.validatePassword(registrationRequest.password) && loginValidation.validateLogin(registrationRequest.login));
}
module.exports.validateSignUp = validateSignUp;
