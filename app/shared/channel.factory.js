/**
 * Channel Factory
 */

app.factory('ChannelFactory', 
['$http', '$q',
function($http, $q){

    return function(data){
        var self = this;
        
        this.channel_id = data.channel_id;
        this.name = data.name;
        this.active = data.active;
        this.timestamp = data.timestamp;
        this.log = [];
        this.users = [];

        this.addUser = function(user){
            self.users.push(user);    
        }

        this.removeUser = function(user){
            var index = self.users.indexOf(user);
            self.users.splice(index, 1);
        }

        this.userCount = function(){
            return this.users.length;
        }

        this.message = function(msg){
            self.log.push(msg);
        }
    }

}]);