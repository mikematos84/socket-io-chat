var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var routes = require('./server/routes')(app);

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
  console.log('socket.io --> started');

  socket.on('disconnect', function(data){ 
  });

  socket.on('join', function(data){
    socket.join(data.channel.name);
    console.log('Client joined ' + data.channel.name);
  });  

  socket.on('leave', function(data){
    socket.leave(data.channel.name);
    console.log('Client left ' + data.channel.name);
  });

  socket.on('channel:message', function(data){
    console.log(data.message);
  });

});
