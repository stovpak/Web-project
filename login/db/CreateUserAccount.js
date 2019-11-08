const UserModel = require('./models/UserModel.js');

function createUserAccount(registrationRequest, response) {
  UserModel.User.create({
    login: registrationRequest.login,
    mail: registrationRequest.mail,
    password: registrationRequest.password,
  });
  response.send('Вы успешно зарегестрировались');
}
module.exports.createUserAccount = createUserAccount;
