app.controller('login.controller', [
    '$scope', 'UserService', 'SessionService', '$state', 
    function($scope, UserService, SessionService, $state){
    
        $scope.user = {
        email: 'mimatos@deloitte.com'
    }

    $scope.login = function(evt){
        if($scope.user.email){
            UserService.email = $scope.user.email;
            UserService.lastLogin = new Date();
            $state.transitionTo('lobby');
        }
    }

    $scope.cancel = function(evt){
        $scope.user = {};
    }

}]);