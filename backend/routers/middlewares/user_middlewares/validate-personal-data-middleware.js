const express = require('express');

const router = express.Router();
const UserPersonalData = require('../../../db/db_objects/user_db_objects/user-personal-data.js');
const userPersonalDataValidation = require('../../../core/validations/user_validation/user-personal-data-validation.js');

router.post('/', (request, response, next) => {
  const PersonalData = new UserPersonalData(request.body.firstName, request.body.secondName, request.body.birthday);
  if (userPersonalDataValidation(PersonalData)) {
    return next();
  }
  response.status(400).send('Данные введены неправильно');
});
module.exports = router;
