(function () {
    'use strict';

    angular
        .module('ATMapp')
        .config(Config);

    Config.$inject = ['$stateProvider'];
    function Config($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: 'app/features/admin/admin.html',
                controller: 'AdminController',
                controllerAs: 'vm',
            });
    }
})();