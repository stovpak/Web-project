const sequelize = require('sequelize');

const sequelizeOperators = sequelize.Op;
const bcrypt = require('bcrypt');
const userModel = require('../../../db/models/user_models/UserModel.js');
const userService = require('./UserService.js');
const createUserResponce = require('../../../db/user_db/CreateUserResponce.js');


function signUp(registrationRequest, response) {
  userModel.user.findOne({
    raw: true,
    where: {
      [sequelizeOperators.or]: [{ login: registrationRequest.login }, { email: registrationRequest.email }],
    },
  })
    .then((User) => {
      if (!User) {
        userService.createUserAccount(registrationRequest, response);
        return;
      }
      response.status(409).send('Такой пользователь уже есть');
    });
}

function signIn(request, response) {
  userModel.user.findOne({
    raw: true,
    where: {
      [sequelizeOperators.or]: [{ login: request.login }, { email: request.login }],
    },
  })
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
