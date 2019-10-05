let mysql = require('mysql');

let connectionConfig = require('./ConfigConnection.json');

const connection = mysql.createConnection(connectionConfig);

connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});


const Sequelize = require("sequelize");
const sequelize = new Sequelize("web", "root", "Edding16", {
    dialect: "mysql",
    host: "localhost",
    logging: false,
    define: {
        timestamps: false,

    }

});




const User = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    Name: {
        type: Sequelize.STRING,

    },
    Date: {
        type: Sequelize.DATE,

    },
    RoleId:{type: Sequelize.INTEGER,},
    Login:{type: Sequelize.STRING,},
    Surname:{type: Sequelize.STRING,},
    Password:{type: Sequelize.STRING,}

});


const LoginRequest  = require("./LoginRequest.js");
const FrontQuery = require("./FrontQuery.js");

let loginRequest = new  LoginRequest('Vasya','Vasya123');


function SingIn (Login,Password)
{
    User.findOne({raw:true,where: {Name: Login,Password:Password}})
        .then(User=>{
            if(!User){
                console.log("Данные введены неправильно");
                return;
            }
            else {
                let userTables = JSON.parse(JSON.stringify(User));
                console.log(userTables);
                let frontQuery = new FrontQuery();
                frontQuery.rankId = userTables["RoleId"];
                frontQuery.login = userTables["Login"];
                console.log(frontQuery.rankId, frontQuery.login);
            }
            }).catch(err=>console.log(err));
};


SingIn(loginRequest.login,loginRequest.password);


