app.controller('lobby.controller', 
['$scope', '$state', 'UserService', 'ChatService', 
function($scope, $state, UserService, ChatService){

    $scope.chatService = ChatService;
    $scope.channels = [];

    ChatService.getChannels().then(function(data){
        $scope.channels = data;
    });

    $scope.joinChannel = function($i){
        ChatService.join($scope.channels[$i]);
        $state.transitionTo('channel', {id: ChatService.currentChannel.channel_id});
    };

}]);