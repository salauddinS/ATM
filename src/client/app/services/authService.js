(function () {
    'use strict';

    angular
        .module('ATMapp')
        .factory('authService', authService);

    authService.$inject = ['$http'];
    function authService($http) {
        var service = {
            login: login,
        };
        return service;

        ////////////////
        function login(request) {
            return $http.post('api/auth/authenticate', request);
        }
    }
})();