const dataConnection = require('../../user_db/data-connection.js');

const {sequelizeConnection} = dataConnection;
const sequrlizeType = sequelizeConnection.Sequelize;
const passwordRestoreKey = sequelizeConnection.define('restore-keys', {
  id: {
    type: sequrlizeType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  key: {
    type: sequrlizeType.STRING,
    allowNull: false,
  },
  email: {
    type: sequrlizeType.STRING,
    allowNull: false,
  },
});
module.exports = passwordRestoreKey;
