const express = require('express');

const router = express.Router();
const LoginRequest = require('../../db/db_objects/user_db_objects/login-request.js');
const authenticationService = require('../controllers/user_controllers/authentification-service.js');

router.post('/', (request, response) => {
  const loginRequestData = new LoginRequest(request.body.login, request.body.password);
  authenticationService.signIn(loginRequestData, response);
});
module.exports = router;
