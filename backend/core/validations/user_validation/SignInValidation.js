const mailValidation = require('./EmailValidation.js');
const passValidation = require('./PasswordValidation.js');
const loginValidation = require('./LoginValidation.js');


function validateSignIn(loginRequest) {
  return !!((mailValidation.validateEmail(loginRequest.login) || loginValidation.validateLogin(loginRequest.login)) && passValidation.validatePassword(loginRequest.password));
}
module.exports.validateSignIn = validateSignIn;
