(function () {
    'use strict';

    angular
        .module('ATMapp')
        .factory('atmService', atmService);

    atmService.$inject = ['$http'];
    function atmService($http) {
        var service = {
            getUserDetail: getUserDetail,
            withdrawAmount:withdrawAmount
        };
        return service;

        ////////////////
        function getUserDetail() {
            return $http.get('api/ATM/GetUserDetails');
        }
        function withdrawAmount(payload) {
            return $http.post('api/ATM/Widthdraw',payload);
        }
    }
})();