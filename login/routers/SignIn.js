const express = require('express');

const router = express.Router();
const LoginRequest = require('../db/db_objects/LoginRequest.js');
const UserResponseServices = require('./controllers/UserResponseServices.js');

router.post('/', (request, response,next) => {
  const loginRequest = new LoginRequest(request.body.login, request.body.password);
  UserResponseServices.SignIn(loginRequest, response);
});
module.exports = router;
