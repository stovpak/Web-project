const dataConnection = require('../../user_db/DataConnection.js');

const { sequelizeConnection } = dataConnection;
const sequrlizeType = sequelizeConnection.Sequelize;
const user = sequelizeConnection.define('users', {
  id: {
    type: sequrlizeType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  first_name: {
    type: sequrlizeType.STRING,
  },
  second_name: {
    type: sequrlizeType.STRING,
  },
  role_id: {
    type: sequrlizeType.INTEGER,
    defaultValue: 1,
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
    unique: false,
  },
  birthday: {
    type: sequrlizeType.DATE,
  },
  email: {
    type: sequrlizeType.STRING,
    allowNull: false,
    unique: true,
  },
});
module.exports.user = user;
