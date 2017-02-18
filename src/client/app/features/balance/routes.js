(function () {
    'use strict';

    angular
        .module('ATMapp')
        .config(Config);

    Config.$inject = ['$stateProvider'];
    function Config($stateProvider) {
        $stateProvider
            .state('balance', {
                url: '/balance',
                templateUrl: 'app/features/balance/balance.html',
                controller: 'BalanceController',
                controllerAs: 'vm',
            });
    }
})();