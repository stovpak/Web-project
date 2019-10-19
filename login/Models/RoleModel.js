const DataConnection= require("../DataConnection.js");
const sequelize=DataConnection .sequelize;
const Sequelize=sequelize.Sequelize;
const Roles=sequelize.define("roles", {
    id:{type: Sequelize.INTEGER,
        primaryKey: true,
        aut oIncrement: true,
        allowNull: false
    },
    role_name:{
        type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports.Roles = Roles;