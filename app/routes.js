app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: '/core/login/index.html'
        })
        .state('/chat', {
            url: '/chat',
            templateUrl: '/core/chat/index.html'
        });

});