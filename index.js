var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const port = 3000;

server.listen(port, function(){
    console.log('app start: ' + port);
});

app.use(express.static(__dirname + '/public'));
app.use('/core', express.static(__dirname + '/app'));
app.use('/scripts', express.static(__dirname + '/node_modules'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});