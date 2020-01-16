const express = require('express');

const router = express.Router();
const UserAdditionalData = require('../../../db/db_objects/user_db_objects/UserAdditionalData.js');
const additionalDataValidation = require('../../../core/validations/user_validation/AdditionalUserDataValidation.js');


router.post('/', (request, response, next) => {
    const AdditionalData = new UserAdditionalData(request.body.first_name,request.body.second_name,request.body.birthday);
    if (additionalDataValidation(AdditionalData)){
        return next();
    }
    response.status(400).send('Данные введены неправильно');
});
module.exports = router;