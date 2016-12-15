app.controller('login.controller', [
    '$scope', 'UserService', 'SessionService', '$location', 
    function($scope, UserService, SessionService, $location){
    
    $scope.user = {
        email: 'mimatos@deloitte.com'
    }

    $scope.login = function(evt){
        if($scope.user.email){
            UserService.email = $scope.user.email;
            UserService.lastLogin = new Date();
            $location.path('/chat');
        }
    }

    $scope.cancel = function(evt){
        $scope.user = {};
    }

}]);