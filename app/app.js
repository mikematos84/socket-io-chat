var app = angular.module('chat-app', [
    'ngMaterial',
    'ui.router'
]);

app.controller('mainCtrl', ['$scope', function($scope){
    $scope.title = 'Hello';   
}]);
