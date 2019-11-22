const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const userModel = require('../../../db/models/user_models/UserModel.js');
const createUserResponce = require('../../../db/user_db/CreateUserResponce.js');

const sequelizeOperators = sequelize.Op;

module.exports.signIn = function singIn(request, response) {
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
};
