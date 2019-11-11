const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const UserModel = require('../../db/models/UserModel.js');
const CreateUserResponce = require('../../db/CreateUserResponce.js');

const SequelizeOperators = Sequelize.Op;

module.exports.SignIn = function SingIn(request, response) {
  UserModel.User.findOne({
    raw: true,
    where: {
      [SequelizeOperators.or]: [{ login: request.login }, { email: request.login }],
    },
  })
    .then((User) => {
      if (!User) {
        response.status(400).send('Данные введены неправильно');
      } else {
        bcrypt.compare(request.password, User.password, (err, res) => {
          if (res) {
            response.status(200).send(CreateUserResponce.CreateUserResponce(User));
          } else {
            response.status(400).send('Данные введены неправильно');
          }
        });
      }
    }).catch((err) => response.send(err));
};
