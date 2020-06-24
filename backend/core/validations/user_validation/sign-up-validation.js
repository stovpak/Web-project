const emailValidation = require('./email-validation.js');
const passValidation = require('./password-validation.js');
const loginValidation = require('./login-validation.js');

function validateSignUp(registrationRequest) {
  return !!(emailValidation.validateEmail(registrationRequest.email) && passValidation.validatePassword(registrationRequest.password) && loginValidation.validateLogin(registrationRequest.login));
}
module.exports.validateSignUp = validateSignUp;
