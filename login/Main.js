const LoginRequest  = require("./LoginRequest.js");
const UserResponse = require("./UserResponse.js");
const UserData = require("./UserData.js");
const DataModels = require("./DataModels");


let loginRequest = new  LoginRequest('Bob123','Bob123');

function SingIn (loginRequest)
{

    DataModels.User.findOne({raw:true,where: {login: loginRequest.login,password:loginRequest.password}})
        .then(User=>{
            if(!User){
                console.log("Данные введены неправильно");
                return;
            }
            else {
                let userTables = JSON.parse(JSON.stringify(User));
                let frontQuery = new UserResponse();
                frontQuery.rankId = userTables["role_id"];
                frontQuery.login = userTables["login"];
                frontQuery.id = userTables["id"];
            }
        }).catch(err=>console.log(err));
};


SingIn(loginRequest);



