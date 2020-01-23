require('dotenv').config();

const connectionConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false,
  },
};

module.exports = connectionConfig;
