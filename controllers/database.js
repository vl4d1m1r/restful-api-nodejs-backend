const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'restful-api-nodejs-db',
  password: 'qwerty1',
});

module.exports = pool.promise();
