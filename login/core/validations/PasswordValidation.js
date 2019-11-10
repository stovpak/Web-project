const PasswordValidator = require('password-validator');

const schema = new PasswordValidator();
schema
  .is().min(8)
  .is().max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces()
  .has()
  .not()
  .symbols();
function PasswordValidation(password) {
  if (password.match(/([а-я])/gi) === null && schema.validate(password)) {
    return true;
  }
  return false;
}
module.exports.PasswordValidation = PasswordValidation;
