const namesValidation = require('./NamesValidation.js');
const dateValidator = require('./DateValidator.js');
function validateAdditionalData(additionalData) {
    if(namesValidation(additionalData.first_name,additionalData.second_name) && dateValidator(additionalData.birthday)){
        return true;
    }
    else{
        return false;
    }
}
module.exports = validateAdditionalData;
