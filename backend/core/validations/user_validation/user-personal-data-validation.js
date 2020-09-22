const nameValidation = require('./name-validation.js');
const dateValidator = require('./date-validator.js');

function validatePersonalData(userPersonalData) {
  return !!(nameValidation(userPersonalData.firstName) && nameValidation(userPersonalData.secondName) && dateValidator(userPersonalData.birthday));
}
module.exports = validatePersonalData;
