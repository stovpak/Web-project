const UserResponse=require("./UserResponse.js");
const UserModel=require("./Models/UserModel.js");

module.exports.SingIn=function SingIn (loginRequest,request,response)
{
    UserModel.User.findOne({
        raw:true,where: {
            login: loginRequest.login,
            password:loginRequest.password
        }
    })
        .then(User=>{
            if(!User){
                response.send("Данные введены неправильно");
                return;
            }
            else {
                let userTables = JSON.parse(JSON.stringify(User));
                let userResponce = new UserResponse();
                userResponce.roleId = userTables["role_id"];
                userResponce.login = userTables["login"];
                userResponce.id = userTables["id"];
                response.send(userResponce);
            }
        }).catch(err=>response.send(err));
};
