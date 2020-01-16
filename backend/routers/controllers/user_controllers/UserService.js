const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const userModel = require('../../../db/models/user_models/UserModel.js');
const passwordValidator = require('../../../core/validations/user_validation/PasswordValidation.js');
const emailValidation = require('../../../core/validations/user_validation/EmailValidation.js');

const sequelizeOperators = sequelize.Op;


const salt = bcrypt.genSaltSync(10);

function createAccount(registrationRequest, response) {
  const password = bcrypt.hashSync(registrationRequest.password, salt);
  userModel.user.create({
    login: registrationRequest.login,
    email: registrationRequest.email,
    password,
  });
  response.status(200).send('Вы успешно зарегестрировались');
}
function exists(login, email) {
    return userModel.user.findOne({
    raw: true,
    where: {
      [sequelizeOperators.or]: [{ login }, { email }],
    },
  });
}
function changeAdditionalData(request, response){
       userModel.user.update({first_name : request.body.first_name,second_name:request.body.second_name,birthday:request.body.birthday},{
           where : {
               login: request.body.login
           }
           });
       response.status(200).send('Данные обновлены');
}
function changePassword(request,response){
    const password = request.body.password;
    if (passwordValidator.validatePassword(password)) {
        const passwordToWrite = bcrypt.hashSync(password, salt);
        userModel.user.update({password: passwordToWrite}, {
            where: {
                login: request.body.login
            }
        });
        response.status(200).send('Данные обновлены');
        return;
    }
    else{
        response.status(400).send('Неправильные данные');
        return
    }
}
function changeEmail(request,response){
    const email = request.body.email;
    if (emailValidation(email)) {
        userModel.user.update({email:email}, {
            where: {
                login: request.body.login
            }
        });
        response.status(200).send('Данные обновлены');
        return;
    }
    else{
        response.status(400).send('Неправильные данные');
        return
    }
}

module.exports.createAccount = createAccount;
module.exports.exists = exists;
module.exports.changeAdditionalData = changeAdditionalData;
module.exports.changePassword = changePassword;
module.exports.changeEmail = changeEmail;
