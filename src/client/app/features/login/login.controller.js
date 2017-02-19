(function () {
    'use strict';

    angular.module('ATMapp').controller('LoginController', LoginController);

    LoginController.$inject = ['authService', '$location', '$rootScope'];

    /* @ngInject */
    function LoginController(authService, $location, $rootScope) {
        /* jshint validthis: true */
        var vm = this;
        vm.user = {};
        vm.login = login;
        vm.errMsg = '';

        activate();

        function activate() {
            if (localStorage.getItem('accessToken') !== null) {
                $location.path('/balance');
            }
        }


        function login() {
            vm.errMsg ='';
            vm.user.userName = vm.box1 + vm.box2 + vm.box3 + vm.box4;
            console.log(vm);
            authService.login(vm.user).then(function (response) {
                localStorage.setItem('accessToken', response.data.token);
                $rootScope.$broadcast('loggedInSuccessfull')
                $location.path('/balance');
            }, function (err) {
                console.log(err);
                vm.errMsg = err.data;
            });
        }

    }
})();