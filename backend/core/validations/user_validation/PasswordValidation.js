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
function validatePassword(password) {
  return !!(password.match(/([^a-z0-9])/gi) === null && schema.validate(password));
}
module.exports.validatePassword = validatePassword;
