const nameValidation = require('./NameValidation.js');
const dateValidator = require('./DateValidator.js');

function validateUserPersonalData(userPersonalData) {
  return !!(nameValidation(userPersonalData.first_name) && nameValidation(userPersonalData.second_name) && dateValidator(userPersonalData.birthday));
}
module.exports = validateUserPersonalData;
