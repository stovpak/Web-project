const bcrypt = require('bcrypt');
const userModel = require('./models/UserModel.js');

const salt = bcrypt.genSaltSync(10);

function createUserAccount(registrationRequest, response) {
  const password = bcrypt.hashSync(registrationRequest.password, salt);
  userModel.user.create({
    login: registrationRequest.login,
    email: registrationRequest.email,
    password: password,
  });
  response.status(200).send('Вы успешно зарегестрировались');
}
module.exports.createUserAccount = createUserAccount;
