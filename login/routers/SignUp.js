const express = require('express');

const router = express.Router();
const registrationRequest = require('../db/db_objects/RegestrationRequest.js');
const userService = require('./controllers/UserRegistrationServices.js');


router.post('/', (request, response) => {
  const registrationRequestData = new registrationRequest(request.body.login, request.body.email, request.body.password);
  userService.signUp(registrationRequestData, response);
});
module.exports = router;
