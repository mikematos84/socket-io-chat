/**
 * Socket.IO
 */

module.exports = function(server){
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log('socket.io --> started');

        socket.on('disconnect', function(data){ 
            console.log(data.client + 'has disconnected from chat');
        });

        socket.on('join', function(data){
            socket.join(data.channel.name);
            console.log(data.client + ' joined ' + data.channel.name);
        });  

        socket.on('leave', function(data){
            socket.leave(data.channel.name);
            console.log(data.client + ' left ' + data.channel.name);
        });

        socket.on('channel:message', function(data){
            console.log(data);
        });
    });

};