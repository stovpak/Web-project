class UserData{
    constructor(roleId,login,password,name,surname,date){
        this.login=login;
        this.password=password;
        this.name=name;
        this.surname=surname;
        this.roleId=roleId;
        this.date=date;
    }
};
module.exports = UserData;