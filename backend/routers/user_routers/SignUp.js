const express = require('express');

const router = express.Router();
const RegistrationRequest = require('../../db/db_objects/user_db_objects/RegestrationRequest.js');
const authentificationService = require('../controllers/user_controllers/AuthentificationService.js');


router.post('/', (request, response) => {
  const registrationRequestData = new RegistrationRequest(request.body.login, request.body.email, request.body.password);
  authentificationService.signUp(registrationRequestData, response);
});
module.exports = router;
