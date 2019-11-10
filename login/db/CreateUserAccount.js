const UserModel = require('./models/UserModel.js');

function createUserAccount(registrationRequest, response) {
  UserModel.User.create({
    login: registrationRequest.login,
    email: registrationRequest.email,
    password: registrationRequest.password,
  });
  response.status(200).send('Вы успешно зарегестрировались');
}
module.exports.createUserAccount = createUserAccount;
