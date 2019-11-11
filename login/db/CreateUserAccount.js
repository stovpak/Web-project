const bcrypt = require('bcrypt');
const UserModel = require('./models/UserModel.js');

const salt = bcrypt.genSaltSync(10);

function createUserAccount(registrationRequest, response) {
  const passwordToSave = bcrypt.hashSync(registrationRequest.password, salt);
  UserModel.User.create({
    login: registrationRequest.login,
    email: registrationRequest.email,
    password: passwordToSave,
  });
  response.status(200).send('Вы успешно зарегестрировались');
}
module.exports.createUserAccount = createUserAccount;
