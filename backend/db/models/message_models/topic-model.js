const dataConnection = require('../../user_db/data-connection.js');

const { sequelizeConnection } = dataConnection;
const sequrlizeType = sequelizeConnection.Sequelize;
const topic = sequelizeConnection.define('topics', {
  id: {
    type: sequrlizeType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  topic_name: {
    type: sequrlizeType.STRING,
    allowNull: false,
  },
  creator_name: {
    type: sequrlizeType.STRING,
    allowNull: false,
  },
});
module.exports = topic;
