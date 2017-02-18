(function () {
    'use strict';

    angular.module('ATMapp').controller('LoginController', LoginController);

    LoginController.$inject = ['authService', '$location', '$rootScope'];
    
    /* @ngInject */
    function LoginController(authService, $location, $rootScope) {
        /* jshint validthis: true */
        var vm = this;
        vm.login = login;
        activate();

        function activate() {
            if ($rootScope.isAuthenticated) {
                $location.path('/');
            }
        }
        function login() {
            authService.login(vm.user).then(function (response) {
                localStorage.setItem('accessToken', response.data.token);
                $rootScope.$broadcast('loggedInSuccessfull')
                $location.path('/balance');
            },function (err) {
                console.log(err)
            });
        }
    }
})();