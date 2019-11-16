const mailValidator = require('email-validator');

function validateEmail(email) {
  return mailValidator.validate(email);
}
module.exports.validateEmail = validateEmail;
