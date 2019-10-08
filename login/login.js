let mysql = require('mysql');

let connectionConfig = require('./ConfigConnection.json');

const connection = mysql.createConnection(connectionConfig);
const LoginRequest  = require("./LoginRequest.js");
const UserResponse = require("./UserResponse.js");
const UserData = require("./UserData.js");





const Sequelize = require("sequelize");
const sequelize = new Sequelize("web","root","Edding16", {
    dialect: "mysql",
    host: "localhost",
    logging: false,
    define: {
        timestamps: false,
    }
});



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

    const User = sequelize.define("users", {
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

    sequelize.sync().then(result=>{
        console.log(result);
    })
        .catch(err=> console.log(err));



let loginRequest = new  LoginRequest('Bob123','Bob123');


function SingIn (loginRequest)
{
    User.findOne({raw:true,where: {login: loginRequest.login,password:loginRequest.password}})
        .then(User=>{
            if(!User){
                console.log("Данные введены неправильно");
                return;
            }
            else {
                let userTables = JSON.parse(JSON.stringify(User));
                console.log(userTables);
                let frontQuery = new UserResponse();
                frontQuery.rankId = userTables["role_id"];
                frontQuery.login = userTables["login"];
                console.log(frontQuery.rankId, frontQuery.login);
            }
            }).catch(err=>console.log(err));
};


SingIn(loginRequest);


