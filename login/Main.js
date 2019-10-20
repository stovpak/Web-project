const express = require('express');
const CreateUser = require('./UserResponseServices.js');
const LoginRequest = require('./LoginRequest.js');

const app = express();
const loginRequest = new LoginRequest('Bob123', 'Bob123');

app.listen(3000);
app.get('/SingIn', (request, response) => {
  CreateUser.SingIn(loginRequest, request, response);
});
