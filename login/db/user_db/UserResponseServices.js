const UserModel = require('../models/user_models/UserModel.js');
const CreateUserResponce = require('./CreateUserResponce.js');

module.exports.SignIn = function SingIn(request, response) {
  UserModel.User.findOne({
    raw: true,
    where: {
      login: request.login,
      password: request.password,
    },
  })
    .then((User) => {
      if (!User) {
        response.status(400).send('Данные введены неправильно');
      } else {
        response.status(200).send(CreateUserResponce.CreateUserResponce(User));
      }
    }).catch((err) => response.status(500).send(err));
};
