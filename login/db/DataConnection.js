const sequelize = require('sequelizeConnection');
require('dotenv').config();

const sequelizeConnection = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'mysql',
  host: 'localhost',
  logging: false,
  define: {
    timestamps: false,
  },
});
module.exports.sequelizeConnection = sequelizeConnection;
