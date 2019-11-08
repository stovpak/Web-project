const express = require('express');

const router = express.Router();
const RegistrationRequest = require('../db/db_objects/RegestrationRequest.js');
const signUpValidation = require('../core/validations/SignUpValidation.js');

router.post('/', (request, response) => {
  const registrationRequest = new RegistrationRequest(request.body.login, request.body.mail, request.body.password);
  signUpValidation.SignUpValidation(registrationRequest, response);
});
module.exports = router;
