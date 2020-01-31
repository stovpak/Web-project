const dataConnection = require('../../user_db/data-connection.js');

const {sequelizeConnection} = dataConnection;
const sequrlizeType = sequelizeConnection.Sequelize;
const message = sequelizeConnection.define('messages', {
  id: {
    type: sequrlizeType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  author_name: {
    type: sequrlizeType.STRING,
    allowNull: false,
  },
  topic_id: {
    type: sequrlizeType.INTEGER,
    references: {
      model: 'topics',
      key: 'id',
    },
  },
  date: {
    type: sequrlizeType.DATE,
    allowNull: false,
  },
  text: {
    type: sequrlizeType.STRING,
  },
});
module.exports = message;
