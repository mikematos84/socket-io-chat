var mysql = require('mysql');

var database = function(){

    this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'chat_app'
    });

    this.connection.connect();
    
    return this.connection;
};

module.exports = database;