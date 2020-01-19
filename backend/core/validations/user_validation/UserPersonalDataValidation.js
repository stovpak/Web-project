const namesValidation = require('./NameValidation.js');
const dateValidator = require('./DateValidator.js');
function validateUserPersonalData(userPersonalData) {
    if(namesValidation(userPersonalData.first_name,userPersonalData.second_name) && dateValidator(userPersonalData.birthday)){
        return true;
    }
    else{
        return false;
    }
}
module.exports = validateUserPersonalData;
