const express = require('express');

const router = express.Router();
const LoginRequest = require('../../db/db_objects/LoginRequest.js');
const signInValidation = require('../../core/validations/SignInValidation.js');


router.post('/', (request, response, next) => {
  const loginRequest = new LoginRequest(request.body.login, request.body.password);
  if (signInValidation.SignInValidation(loginRequest, response)) {
    return next();
  }

  response.status(400).send('Данные введены неправильно');
});
module.exports = router;
