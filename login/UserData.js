class UserData{
    constructor(roleId,login,password,name,surname,birthday){
        this.login=login;
        this.password=password;
        this.name=name;
        this.surname=surname;
        this.roleId=roleId;
        this.birthday=birthday;
    }
};
module.exports = UserData;
