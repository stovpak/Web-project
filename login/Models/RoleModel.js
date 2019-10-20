const DataConnection = require('../DataConnection.js');

const { sequelize } = DataConnection;
const { Sequelize } = sequelize;
const Roles = sequelize.define('roles', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  role_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports.Roles = Roles;
