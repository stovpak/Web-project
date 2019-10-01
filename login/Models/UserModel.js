
const DataConnection = require('../DataConnection.js');

const { sequelize } = DataConnection;
const sequrlizeType = sequelize.Sequelize;
const User = sequelize.define('users', {
  id: {
    type: sequrlizeType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  first_name: {
    type: sequrlizeType.STRING,
    allowNull: false,
  },
  second_name: {
    type: sequrlizeType.STRING,
    allowNull: false,

  },
  role_id: {
    type: sequrlizeType.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'id',
    },
  },
  login: {
    type: sequrlizeType.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: sequrlizeType.STRING,
    allowNull: false,
    unique: true,
  },
  birthday: {
    type: sequrlizeType.DATE,
    allowNull: false,
  },
});
module.exports.User = User;