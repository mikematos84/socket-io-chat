app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: '/core/features/login/index.html'
        })
        .state('/chat', {
            url: '/chat',
            templateUrl: '/core/features/chat/index.html'
        });

});