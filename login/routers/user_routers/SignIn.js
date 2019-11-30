const express = require('express');

const router = express.Router();
const LoginRequest = require('../../db/db_objects/user_db_objects/LoginRequest.js');
const autheficationServices = require('../controllers/user_controllers/AuthentificationServices.js');


router.post('/', (request, response) => {
  const loginRequestData = new LoginRequest(request.body.login, request.body.password);
  autheficationServices.signIn(loginRequestData, response);
});
module.exports = router;
