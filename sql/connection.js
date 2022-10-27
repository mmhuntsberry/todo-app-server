const mysql = require("mysql2");

require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE, DB_HOST } = process.env;

// create the connection to database
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

module.exports = pool;
