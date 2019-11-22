const dataConnection = require('../../user_db/DataConnection.js');

const { sequelizeConnection } = dataConnection;
const sequrlizeType = sequelizeConnection.Sequelize;
const roles = sequelizeConnection.define('roles', {
  id: {
    type: sequrlizeType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  role_name: {
    type: sequrlizeType.STRING,
    allowNull: false,
  },
});
module.exports.roles = roles;
