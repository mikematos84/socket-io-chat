var app = angular.module('chat-app', [
    'ngMaterial',
    'ui.router'
]);

app.controller('mainCtrl', 
['$scope', '$timeout', '$state', 'SessionService', 
function($scope, $timeout, $state, SessionService){
    
    $scope.session = SessionService;
    
    SessionService.reload().then(function(res){
        if(res.data.user){
            SessionService.user = res.data.user;
            SessionService.loggedIn = true;
        }
    });

    $scope.logout = function(){
        SessionService.destroy().then(function(res){
            $state.transitionTo('home');
        });
    }

}]);
