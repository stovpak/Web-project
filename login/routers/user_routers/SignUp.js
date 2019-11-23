const express = require('express');

const router = express.Router();
const RegistrationRequest = require('../../db/db_objects/user_db_objects/RegestrationRequest.js');
const userService = require('../controllers/user_controllers/UserRegistrationServices.js');


router.post('/', (request, response) => {
  const registrationRequestData = new RegistrationRequest(request.body.login, request.body.email, request.body.password);
  userService.signUp(registrationRequestData, response);
});
module.exports = router;
