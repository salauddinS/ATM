(function () {
    'use strict';

    angular
        .module('ATMapp')
        .config(Config);

    Config.$inject = ['$stateProvider','$urlRouterProvider'];
    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/features/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/features/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
            });
            $urlRouterProvider.otherwise('/');
    }
})();