const UserModel = require('../../db/models/UserModel.js');
const CreateUserResponce = require('../../db/CreateUserResponce.js');
const Sequelize = require('sequelize');

const SequelizeOperators = Sequelize.Op;

module.exports.SignIn = function SingIn(request, response) {
  UserModel.User.findOne({
    raw: true,
    where: {
        [SequelizeOperators.or]: [{ login: request.login }, { email: request.login }],
        password:request.password,
    },
  })
    .then((User) => {
      if (!User) {
        response.status(400).send('Данные введены неправильно');
      } else {
        response.status(200).send(CreateUserResponce.CreateUserResponce(User));
      }
    }).catch((err) => response.send(err));
};
