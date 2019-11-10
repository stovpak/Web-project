const mailValidator = require('email-validator');

function EmailValidation(email) {
  return mailValidator.validate(email);
};
module.exports.MailValidation = EmailValidation;
