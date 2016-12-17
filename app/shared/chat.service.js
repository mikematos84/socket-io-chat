/**
 * Chat Socket
 */
app.service('ChatService', 
['$http', '$q', '$rootScope', 'SessionService', 'ChannelFactory',
function($http, $q, $rootScope, SessionService, ChannelFactory){
    
    var self = this;
    var socket = io.connect('http://localhost:3000');
    
    this.channels = [];
    this.channel = {};
        this.message = '';
    
    this.connect = function(){
        var defer = $q.defer();
        
        if(self.channels.length > 0){
            defer.resolve('Channel list already loaded');
        }else{
            self.getChannelsList().then(function(data){
                defer.resolve('Channel list loaded');
            }, function(err){
                defer.reject(err);
            });
        }

        return defer.promise;
    }

    this.getChannelsList = function(truncate = false){
        var defer = $q.defer();
        $http.get('/api/rooms').then(function(req, res){
            if(req.data){
                if(truncate){
                    self.channels = [];
                }
                for(var i in req.data){
                    self.channels.push(new ChannelFactory(req.data[i]));
                }
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
        SessionService.user.socket_id = socket.id;
        self.channel.addUser(SessionService.user);
        socket.emit('join', {channel: channel, client: SessionService.user.email});
    }
    
    this.leave = function(channel){
        self.channel.removeUser(SessionService.user);
        socket.emit('leave', {channel: self.channel, client: SessionService.user.email});
    }

    this.channelMessage = function(){
        socket.emit('channel:message', {
            channel: self.channel,
            user: SessionService.user.email,
            message: self.message,
            timestamp: new Date()
        });
        self.channel.message(SessionService.user.email + ': ' + self.message);
        self.message = '';
    }

    socket.on('user:joined', function(data){
        self.channel.log.push(data.client + ' joined ' + data.channel.name);
        $rootScope.$apply();
    });

    socket.on('user:left', function(data){
        self.channel.log.push(data.client + ' left ' + data.channel.name);
        $rootScope.$apply();
    });

    socket.on('channel:message', function(data){
        self.channel.log.push(data.user + ': ' + data.message);
        $rootScope.$apply();
    });

    return this;    

}]);