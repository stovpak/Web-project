require('dotenv').config();

/*
"database": process.env.DB_NAME,
    "username":process.env.DB_USER ,
    "password": process.env.DB_PASS,
 */
let connectionConfig = {
    "database": "web",
    "username":"root" ,
    "password": "Edding16",
    "host": "localhost",
    "dialect": "mysql",
    "logging": "false",
    "define": {
        "timestamps": "false",
    },
}
module.exports = connectionConfig;