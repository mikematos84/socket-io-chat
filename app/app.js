var app = angular.module('chat-app', [
    'ngMaterial',
    'ui.router'
]);

app.controller('mainCtrl', 
['$rootScope', '$scope', '$timeout', '$state', 'SessionService', 
function($rootScope, $scope, $timeout, $state, SessionService){
    
    $scope.session = SessionService;
    $rootScope.socket = io.connect('http://localhost:3000');
    
    SessionService.reload().then(function(res){
        if(res.data.user){
            SessionService.user = res.data.user;
            SessionService.loggedIn = true;
        }
    });

    $scope.logout = function(){
        $rootScope.socket.emit('leave-user-channel', SessionService.user);
        $rootScope.socket.disconnect();
        SessionService.destroy().then(function(res){
            $state.transitionTo('home');
        });
    }

}]);
