const express = require('express');

const router = express.Router();
const RegistrationRequest = require('../db/db_objects/RegestrationRequest.js');
const UserExistCheck = require('./controllers/UserExistCheck.js');


router.post('/', (request, response) => {
  const registrationRequest = new RegistrationRequest(request.body.login, request.body.email, request.body.password);
  UserExistCheck.UserExist(registrationRequest, response);
});
module.exports = router;
