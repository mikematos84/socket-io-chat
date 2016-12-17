app.service('ChatService', 
['$http', '$q', 'SessionService', function($http, $q, SessionService){
    
    var self = this;

    this.channels = [];
    this.channel = {};
    this.client = {};
    this.log = {};
    this.message = '';

    /**
     * Chat Socket
     */
    var socket = io.connect('http://localhost:3000');
    
    this.connect = function(){
        var defer = $q.defer();
        $http.get('/api/rooms').then(function(req, res){
            if(req.data){
                self.channels = req.data;
                defer.resolve(req.data);
            }
            defer.resolve();
        }, function(err){
            defer.reject(err);
        });
        return defer.promise;
    }

    this.getChannel = function(id){
        for(var i in self.channels){
            if(self.channels[i].channel_id == id){
                return self.channels[i];
            }
        }
    }

    this.setChannel = function(id){
        var channel = self.getChannel(id);
        if(channel){
            self.channel = channel;
        }
    }
    
    this.join = function(channel){
        self.channel = channel;
        self.message = '';
        socket.emit('join', {channel: channel, client: SessionService.user.email});
    }

    this.leave = function(channel){
        socket.emit('leave', {channel: self.channel, client: SessionService.user.email});
    }

    this.channelMessage = function(){
        socket.emit('channel:message', {
            channel: self.channel,
            user: SessionService.user.email,
            message: self.message,
            timestamp: new Date()
        });
        self.message = '';
    }

    return this;    

}]);