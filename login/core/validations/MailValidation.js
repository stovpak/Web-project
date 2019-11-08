const mailValidator = require('email-validator');

function MailValidation(mail) {
  return mailValidator.validate(mail);
}
module.exports.MailValidation = MailValidation;
