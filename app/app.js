var app = angular.module('chat-app', [
    'ngMaterial',
    'ui.router'
]);

app.controller('mainCtrl', ['$scope', function($scope){
    $scope.title = 'Hello';

    var socket = io.connect('http://localhost:3000');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });
}]);
