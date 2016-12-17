/**
 * Session 
 */
app.service('SessionService', 
['$http', '$q', '$state',
function($http, $q, $state){

    var self = this;

    this.user = {};
    this.loggedIn = false;

    this.start = function(data){
        var defer = $q.defer();

        $http.post('/api/session', {user: {data: data}})
        .then(function(res){
            self.user = data;
            defer.resolve(res);
        }, function(err){
            defer.reject(err);
        });
        
        return defer.promise;
    }

    this.reload = function(){
        var defer = $q.defer();

        $http.get('/api/session')
        .then(function(res){
            if(res.data.user){
                self.user = res.data.user;
                self.loggedIn = true;
            }
            defer.resolve(res);

        }, function(err){
            defer.reject(err);
        })

        return defer.promise;
    }

    this.destroy = function(){
        var defer = $q.defer();
        
        $http.delete('/api/session')
        .then(function(res){
            self.user = {};
            self.loggedIn = false;
            defer.resolve(res);
        }, function(err){
            defer.reject(err);
        })
        
        return defer.promise;
    }

    return this;    

}]);