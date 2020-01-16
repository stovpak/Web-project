const Sequelize = require('sequelize');
require('dotenv').config();
const config = require('../../config/Config');

const sequelizeConnection  = new Sequelize(config.database, config.username, config.password,config);


module.exports.sequelizeConnection = sequelizeConnection;
