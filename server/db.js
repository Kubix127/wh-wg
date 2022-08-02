const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'eu-cdbr-west-02.cleardb.net',
    user: process.env.MYSQL_USER || 'be272d29b3dde1',
    password: process.env.MYSQL_PWD || '94ffc5a4',
    database: process.env.MYSQL_DB || 'heroku_5776882340ec5aa',
    multipleStatements: true,
    connectionLimit: 8,
  });
  
  module.exports = pool;