const express = require('express');

const router = express.Router();
const RegistrationRequest = require('../../../db/db_objects/user_db_objects/regestration-request.js');
const signUpValidation = require('../../../core/validations/user_validation/sign-up-validation.js');

router.post('/', (request, response, next) => {
  const registrationRequestData = new RegistrationRequest(request.body.login, request.body.email, request.body.password);
  if (signUpValidation.validateSignUp(registrationRequestData, response)) {
    return next();
  }
  response.status(400).send('Данные введены неправильно');
});
module.exports = router;
