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
  is_weekly: {
    type: sequrlizeType.BOOLEAN,
    defaultValue: true,
  },
  is_monthly: {
    type: sequrlizeType.BOOLEAN,
    defaultValue: true,
  },
});
module.exports = topicLike;
