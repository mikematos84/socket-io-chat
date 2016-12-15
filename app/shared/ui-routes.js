app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/core/components/login/index.html'
        })
        .state('lobby', {
            url: '/lobby',
            templateUrl: '/core/components/lobby/index.html'
        })
        .state('channel', {
            url: '/channel/:id',
            templateUrl: '/core/components/channel/index.html'
        });

});