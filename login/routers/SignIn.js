const express = require('express');

const router = express.Router();
const loginRequest = require('../db/db_objects/LoginRequest.js');
const userResponseServices = require('./controllers/UserResponseServices.js');

router.post('/', (request, response) => {
  const loginRequestData = new loginRequest(request.body.login, request.body.password);
  userResponseServices.signIn(loginRequestData, response);
});
module.exports = router;
