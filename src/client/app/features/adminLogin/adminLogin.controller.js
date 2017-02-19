(function () {
    'use strict';

    angular.module('ATMapp').controller('AdminLoginController', AdminLoginController);

    AdminLoginController.$inject = ['adminService', '$location', '$rootScope'];

    /* @ngInject */
    function AdminLoginController(adminService, $location, $rootScope) {
        /* jshint validthis: true */
        var vm = this;
        vm.user = {};
        vm.login = login;
        vm.errorMessage;
        activate();

        function activate() {
        }


        function login() {
            vm.errorMessage =''
            adminService.login(vm.user).then(function (response) {
                localStorage.setItem('accessToken', response.data.token);
                $rootScope.$broadcast('loggedInSuccessfull')
                $location.path('/admin');
            }, function (err) {
                console.log(err);
                vm.errorMessage = err.data;
            });
        }
    }
})();