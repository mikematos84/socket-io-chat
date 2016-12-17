app.controller('lobby.controller', 
['$rootScope', '$scope', '$state', '$timeout', 'SessionService', 'ChatService', 
function($rootScope, $scope, $state, $timeout, SessionService, ChatService){

    $scope.chatService = ChatService;

    /** Connect to chat services */
    ChatService.connect().then(function(data){
        ChatService.channels = data;
    });
    
    $scope.joinChannel = function($i){
        ChatService.join(ChatService.channels[$i]);
        $state.transitionTo('channel', {id: ChatService.channel.channel_id});
    };

}]);