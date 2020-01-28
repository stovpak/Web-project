const mailValidation = require('./email-validation.js');
const passValidation = require('./password-validation.js');
const loginValidation = require('./login-validation.js');


function validateSignIn(loginRequest) {
  return !!((mailValidation.validateEmail(loginRequest.login) || loginValidation.validateLogin(loginRequest.login)) && passValidation.validatePassword(loginRequest.password));
}
module.exports.validateSignIn = validateSignIn;
