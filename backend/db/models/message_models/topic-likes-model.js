const dataConnection = require('../../user_db/data-connection.js');

const {sequelizeConnection} = dataConnection;
const sequrlizeType = sequelizeConnection.Sequelize;
const topicLike = sequelizeConnection.define('topic-likes', {
  id: {
    type: sequrlizeType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  topic_id: {
    type: sequrlizeType.STRING,
    allowNull: false,
  },
  user_login: {
    type: sequrlizeType.STRING,
    allowNull: false,
  },
  date: {
    type: sequrlizeType.DATE,
    allowNull: false,
  },
});
module.exports = topicLike;
