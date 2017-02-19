(function () {
    'use strict';

    angular
        .module('ATMapp')
        .config(Config);

    Config.$inject = ['$stateProvider','$urlRouterProvider'];
    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('adminLogin', {
                url: '/adminLogin',
                templateUrl: 'app/features/adminLogin/adminLogin.html',
                controller: 'AdminLoginController',
                controllerAs: 'vm',
            });
            $urlRouterProvider.otherwise('/');
    }
})();