
const singIn=require("./SingIn.js");
const LoginRequest  = require("./LoginRequest.js");
const express = require("express");
const app = express();

const LoginRequest  = require("./LoginRequest.js");
const UserResponse = require("./UserResponse.js");
const UserData = require("./UserData.js");
const UserModel = require("./Models/UserModel.js");



let loginRequest = new  LoginRequest('Bob123','Bob123');


app.listen(3000);
app.get("/SingIn",function(request, response){
    singIn.SingIn(loginRequest,request,response);
});

function SingIn (loginRequest)
{

    UserModel.User.findOne({raw:true,where: {login: loginRequest.login,password:loginRequest.password}})
        .then(User=>{
            if(!User){
                console.log("Данные введены неправильно");
                return;
            }
            else {
                let userTables = JSON.parse(JSON.stringify(User));
                let userResponce = new UserResponse();
                userResponce.roleId = userTables["role_id"];
                userResponce.login = userTables["login"];
                userResponce.id = userTables["id"];
            }
        }).catch(err=>console.log(err));
};


SingIn(loginRequest);




