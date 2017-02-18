(function () {
    'use strict';

    angular.module('ATMapp').controller('ShellCtrl', ShellCtrl);

    ShellCtrl.$inject = ['$rootScope', '$location'];

    function ShellCtrl($rootScope, $location) {
        /* jshint validthis:true */
        var vm = this;
        $rootScope.isAuthenticated = vm.isAuthenticated = false;
        vm.logout = logout;
        activate();

        function activate() {
            if (localStorage.getItem('accessToken') !== null) {
                $rootScope.isAuthenticated = vm.isAuthenticated = true;
                $location.path('/balance');
            } else {
                $location.path('/login');
            }

        }

        function logout() {
            $rootScope.isAuthenticated = vm.isAuthenticated = false;
            $location.path('/login');
            localStorage.clear();
        }
        $rootScope.$on('loggedInSuccessfull', function () {
            $rootScope.isAuthenticated = vm.isAuthenticated = true;
        })
    }
})();
