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



const User  = require("./UserClass.js");

let user = new  User('Vasya','Vasya123');

function SingIn (Login,Password)
{
    connection.query('SELECT * FROM users WHERE Login =  ? and Password = ?' ,[Login,Password], function (err,results,dields) {
        let userTables = JSON.parse(JSON.stringify(results));

        if (userTables[0] == null) {
                 console.log("Данные введены неправильно");
            return;
        }
        else {
            let role = userTables[0]["RoleId"];
            console.log(role);
        }
    });
};


SingIn(user.login,user.password);


