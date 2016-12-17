/**
 * Database Connection
 */
var mysql = require('mysql');

module.exports = function(){
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'chat_app'
    });

    db.connect();

    return db;
}(); //self execute