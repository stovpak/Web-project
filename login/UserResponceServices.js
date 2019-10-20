const UserModel=require("./Models/UserModel.js");
const createUserResponce=require("./CreateUserResponce.js");
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
                response.send(createUserResponce.CreateUserResponce(User));
                return;
            }
        }).catch(err => response.send(err));
};
