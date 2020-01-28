const Sequelize = require('sequelize');
const config = require('../../config/config');

const sequelizeConnection = new Sequelize(config.database, config.username, config.password, config);


module.exports.sequelizeConnection = sequelizeConnection;
