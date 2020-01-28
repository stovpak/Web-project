const express = require('express');

const router = express.Router();
const LoginRequest = require('../../../db/db_objects/user_db_objects/login-request.js');
const signInValidation = require('../../../core/validations/user_validation/sign-in-validation.js');


router.post('/', (request, response, next) => {
  const loginRequestData = new LoginRequest(request.body.login, request.body.password);
  if (signInValidation.validateSignIn(loginRequestData, response)) {
    return next();
  }
  response.status(400).send('Данные введены неправильно');
});
module.exports = router;
