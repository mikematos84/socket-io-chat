app.controller('channel.controller', 
['$scope', '$stateParams', '$timeout', '$state', 'ChatService', 'SessionService', '$mdDialog',  
function($scope, $stateParams, $timeout, $state, ChatService, SessionService, $mdDialog){

    $scope.stateParams = $stateParams;
    $scope.chatService = ChatService;

    /** Connect to chat services */
    ChatService.connect().then(function(data){
        ChatService.setChannel($stateParams.id);
    });

    $scope.sendMessage = function(){
        ChatService.channelMessage();
    }

    $scope.leaveChannel = function(){
        ChatService.leave(ChatService.channel);
        $state.transitionTo('lobby');
    }

}]);