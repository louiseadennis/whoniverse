// MySQL Server >= 5.6
// MySQL for Node.js - Install with command: npm install mysql2 --save.

require('dotenv').config({path:__dirname+'/./../../.env'});

const mysql = require('mysql2');
const path = require('path');

var connection = mysql.createPool({
        host     : process.env.HOST,
        user     : process.env.DB_USER,
        password : process.env.PASSWORD,
        database : process.env.DB
});

module.exports = connection;
