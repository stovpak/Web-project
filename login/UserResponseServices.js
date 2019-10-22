const UserModel = require('./Models/UserModel.js');
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
        response.send('Данные введены неправильно');
      } else {
        response.send(CreateUserResponce.CreateUserResponce(User));
      }
    }).catch((err) => response.send(err));
};
