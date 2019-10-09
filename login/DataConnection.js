const Sequelize = require("sequelize");
const sequelize = new Sequelize("web","root",process.env.Db_Password, {
    dialect: "mysql",
    host: "localhost",
    logging: false,
    define: {
        timestamps: false,
    }
});
module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;