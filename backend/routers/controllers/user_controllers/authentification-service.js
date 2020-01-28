const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('./user-service.js');
require('dotenv').config();

function signUp(request, response) {
  userService.exists(request.login, request.email)
    .then((User) => {
      if (!User) {
        userService.createAccount(request, response);
        return;
      }
      response.status(409).send('Такой пользователь уже существует');
    }).catch((err) => response.status(500).send(err));
}

function signIn(request, response) {
  userService.exists(request.login, request.login)
    .then((User) => {
      if (!User) {
        response.status(400).send('Данные введены неправильно');
      } else {
        bcrypt.compare(request.password, User.password, (err, res) => {
          if (res) {
            const responseStr = `${User.login} ${User.role_id.toString()}`;
            const token = jwt.sign(responseStr, process.env.JWT_KEY);
            response.status(200).send(token);
          } else {
            response.status(400).send('Данные введены неправильно');
          }
        });
      }
    }).catch((err) => response.status(500).send(err));
}
module.exports.signUp = signUp;
module.exports.signIn = signIn;
