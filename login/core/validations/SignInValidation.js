const mailValidation = require('./EmailValidation.js');
const passValidation = require('./PasswordValidation.js');
const loginValidation = require('./LoginValidation.js');


function validateSignIn(loginRequest) {
  if ((mailValidation.validateEmail(loginRequest.login) || loginValidation.validateLogin(loginRequest.login)) && passValidation.validatePassword(loginRequest.password)) {
    return true;
  }
  return false;
}
module.exports.validateSignIn = validateSignIn;
