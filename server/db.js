const mysql = require('mysql');
 
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || process.env.REACT_APP_MYSQL_HOST,
    user: process.env.MYSQL_USER || process.env.REACT_APP_MYSQL_USER,
    password: process.env.MYSQL_PWD || process.env.REACT_APP_MYSQL_PWD,
    database: process.env.MYSQL_DB || process.env.REACT_APP_MYSQL_DB,
    multipleStatements: true,
    connectionLimit: 5,
  });

  module.exports = pool;