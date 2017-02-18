(function () {
    'use strict';

    angular
        .module('ATMapp')
        .factory('atmService', atmService);

    atmService.$inject = ['$http'];
    function atmService($http) {
        var service = {
            getUserDetail: getUserDetail,
            checkAmount:checkAmount
        };
        return service;

        ////////////////
        function getUserDetail() {
            return $http.get('api/ATM/GetUserDetails');
        }
        function checkAmount(payload) {
            return $http.post('api/ATM/CheckAmount',payload);
        }
    }
})();