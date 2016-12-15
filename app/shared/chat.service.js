app.service('ChatService', ['$http', '$q', function($http, $q){
    
    this.currentChannel = {};
    this.client = {};
    this.log = {};

    /**
     * Chat Socket
     */
    var socket = io.connect('http://localhost:3000');
    
    this.getChannels = function(){
        var defer = $q.defer();
        $http.get('/api/rooms').then(function(req, res){
            if(req.data){
                defer.resolve(req.data);
            }
            defer.resolve();
        }, function(err){
            defer.reject(err);
        });
        return defer.promise;
    }

    this.join = function(channel){
        if(this.currentChannel !== undefined){
            this.leave(this.currentChannel);
        }
        this.currentChannel = channel;
        socket.emit('join', {channel: channel});
    }

    this.leave = function(channel){
        socket.emit('leave', {channel: channel});
    }

    this.channelMessage = function(message){
        socket.broadcast.to(this.currentChannel).emit('channel:message', {message: message});
    }    

}]);