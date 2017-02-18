(function () {
    'use strict';

    angular
        .module('ATMapp')
        .factory('adminService', adminService);

    adminService.$inject = ['$http'];
    function adminService($http) {
        var service = {
            getAccountList: getAccountList,
            saveAccount:saveAccount,
            deleteAccount:deleteAccount,
            editAccount:editAccount
        };
        return service;

        ////////////////
        function getAccountList() {
            return $http.get('api/Admin/GetAccountList');
        }
        function saveAccount(payload) {
            return $http.post('api/Admin/SaveAccount',payload);
        }
         function editAccount(payload) {
            return $http.post('api/Admin/EditAccount',payload);
        }
        function deleteAccount(payload) {
            return $http.post('api/Admin/DeleteAccount',payload);
        }
    }
})();