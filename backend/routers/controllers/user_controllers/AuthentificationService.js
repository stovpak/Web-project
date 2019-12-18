const bcrypt = require('bcrypt');
const userService = require('./UserService.js');
const createUserResponce = require('../../../db/user_db/CreateUserResponce.js');


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
            response.status(200).send(createUserResponce.createUserResponce(User));
          } else {
            response.status(400).send('Данные введены неправильно');
          }
        });
      }
    }).catch((err) => response.status(500).send(err));
}
module.exports.signUp = signUp;
module.exports.signIn = signIn;
