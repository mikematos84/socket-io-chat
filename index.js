/** 
 * Constnats
 */
const port = 3000;


/** 
 * Modules
 */
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');

/**
 * Server Configurations
 */
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));
app.use('/core', express.static(__dirname + '/app'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


/**
 * Exports
 */
var session = require('./server/session')(app);
var routes = require('./server/routes')(app);
var socketIO = require('./server/socket-io')(server);

/**
 * Server initialization
 */
server.listen(port, function(){
    console.log('app start: ' + port);
});