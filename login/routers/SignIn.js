const express = require('express');

const router = express.Router();
const LoginRequest = require('../db/db_objects/LoginRequest.js');
const signInValidation = require('../core/validations/SignInValidation.js');


router.post('/', (request, response) => {
  const loginRequest = new LoginRequest(request.body.login, request.body.password);
  signInValidation.SignInValidation(loginRequest, response);
});
module.exports = router;
