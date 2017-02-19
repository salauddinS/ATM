(function () {
    'use strict';

    angular.module('ATMapp').controller('RootController', RootController);

    RootController.$inject = ['$rootScope', '$location'];

    function RootController($rootScope, $location) {
        var vm = this;
        $rootScope.isAuthenticated = vm.isAuthenticated = false;
        vm.logout = logout;
        activate();

        function activate() {
            if (localStorage.getItem('accessToken') === null) {
               $location.path('/login');
            } else {
                $rootScope.isAuthenticated = vm.isAuthenticated = true;
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
