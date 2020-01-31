const express = require('express');

const router = express.Router();
const RegistrationRequest = require('../../db/db_objects/user_db_objects/regestration-request.js');
const authenticationService = require('../controllers/user_controllers/authentification-service.js');

router.post('/', (request, response) => {
  const registrationRequestData = new RegistrationRequest(request.body.login, request.body.email, request.body.password);
  authenticationService.signUp(registrationRequestData, response);
});
module.exports = router;
