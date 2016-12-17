/**
 * Socket.IO
 */

module.exports = function(server){
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log('socket.io --> started', socket.id);
        
        socket.on('disconnect', function(data){ 
            console.log(data.client + 'has disconnected from chat');
        });

        socket.on('join', function(data){
            socket.join(data.channel.name);
            var socketsInRoom = io.sockets.adapter.rooms[data.channel.name];
            socket.broadcast.to(data.channel.name).emit('user:joined', data);
            io.in(data.channel.name).emit('update', socketsInRoom);
        });  

        socket.on('leave', function(data){
            socket.leave(data.channel.name);
            var socketsInRoom = io.sockets.adapter.rooms[data.channel.name];
            socket.broadcast.to(data.channel.name).emit('user:left', data);
            io.in(data.channel.name).emit('update', socketsInRoom);
        });

        socket.on('channel:message', function(data){
            socket.broadcast.to(data.channel.name).emit('channel:message', data);
        });
    });

};