const sq =  require("./DataConnection.js");
const sequelize = sq.sequelize;
const Sequelize = sq.Sequelize;
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
module.exports.User = User;
module.exports.Roles = Roles;
