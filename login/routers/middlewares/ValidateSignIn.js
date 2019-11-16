const express = require('express');

const router = express.Router();
const loginRequest = require('../../db/db_objects/LoginRequest.js');
const signInValidation = require('../../core/validations/SignInValidation.js');


router.post('/', (request, response, next) => {
  const loginRequestData = new loginRequest(request.body.login, request.body.password);
  if (signInValidation.validateSignIn(loginRequestData, response)) {
    return next();
  }

  response.status(400).send('Данные введены неправильно');
});
module.exports = router;
