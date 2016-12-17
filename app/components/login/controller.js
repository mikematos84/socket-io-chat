app.controller('login.controller', [
'$scope', 'SessionService', '$state', 
function($scope, SessionService, $state){
    
    $scope.user = {
        email: 'mimatos@deloitte.com'
    }

    $scope.login = function(evt){
        if($scope.user.email){
            var user = {
                email: $scope.user.email,
                last_login: new Date()
            };
            SessionService.start(user).then(function(res){
                $scope.$emit('updateService', user);
                $state.transitionTo('lobby');
            });
        }
    }

    $scope.cancel = function(evt){
        $scope.user = {};
    }

}]);