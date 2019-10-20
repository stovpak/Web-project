const DataConnection = require('../DataConnection.js');

const { sequelize } = DataConnection;
const sequrlizeType = sequelize.Sequelize;
const Roles = sequelize.define('roles', {
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
module.exports.Roles = Roles;
