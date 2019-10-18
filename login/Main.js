const CreateUser=require("./UserResponceServices.js");
const LoginRequest  = require("./LoginRequest.js");
const express = require("express");
const app = express();


let loginRequest = new  LoginRequest('Bob123','Bob123');

app.listen(3000);
app.get("/SingIn",function(request, response){
    CreateUser.SingIn(loginRequest,request,response);
});