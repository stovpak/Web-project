const dbValidation = require('./DbValidation.js');
const mailValidation = require('./MailValidation.js');
const passValidation = require('./PasswordValidation.js');
const loginValidation = require('./LoginValidation.js');

function SignUpValidation(registrationRequest, response) {
  if (mailValidation.MailValidation(registrationRequest.mail) && passValidation.PasswordValidation(registrationRequest.password) && loginValidation.LoginValidation(registrationRequest.login)) {
    dbValidation.CopyCheck(registrationRequest, response);
  } else {
    response.send('Данные введены неправильно');
  }
}
module.exports.SignUpValidation = SignUpValidation;
