const sq =  require("../DataConnection.js");
const sequelize = sq.sequelize;
const Sequelize = sq.Sequelize;
const Roles = sequelize.define("roles", {
    id:{type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    role_name:{
        type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports.Roles = Roles;