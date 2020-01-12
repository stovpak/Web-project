const Sequelize = require('sequelize');
require('dotenv').config();
const con = require('../../config/config')
const sequelizeConnection  = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,con
);


module.exports.sequelizeConnection = sequelizeConnection;
