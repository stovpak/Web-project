const express = require('express');

const router = express.Router();
const UserPersonalData = require('../../../db/db_objects/user_db_objects/UserPersonalData.js');
const userPersonalDataValidation = require('../../../core/validations/user_validation/UserPersonalDataValidation.js');


router.post('/', (request, response, next) => {
  const PersonalData = new UserPersonalData(request.body.first_name, request.body.second_name, request.body.birthday);
  if (userPersonalDataValidation(PersonalData)) {
    return next();
  }
  response.status(400).send('Данные введены неправильно');
});
module.exports = router;
