const DataConnection = require("../DataConnection.js");
const sequelize=DataConnection.sequelize;
const Sequelize=sequelize.Sequelize;
const User=sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    second_name:{
        type: Sequelize.STRING,
        allowNull: false,

    },
    role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'roles',
            key: 'id'
        }
    },
    login:{
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    birthday: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports.User = User;