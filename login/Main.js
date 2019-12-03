
const express = require('express');
const bodyParser = require('body-parser');
const CreateUser = require('./UserResponseServices.js');
const LoginRequest = require('./LoginRequest.js');

const app = express();

app.listen(3000);
app.use(bodyParser.json());
app.post('/SignIn', (request, response) => {
  const loginRequest = new LoginRequest(request.body.login, request.body.password);
  CreateUser.SignIn(loginRequest, response);
});