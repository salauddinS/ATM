(function () {
    'use strict';

    angular.module('ATMapp').controller('LoginController', LoginController);

    LoginController.$inject = ['authService', '$location', '$rootScope','$uibModal'];

    /* @ngInject */
    function LoginController(authService, $location, $rootScope,$uibModal) {
        /* jshint validthis: true */
        var vm = this;
        vm.user = {};
        vm.login = login;

        activate();

        function activate() {
            if (localStorage.getItem('accessToken') !== null) {
                $location.path('/balance');
            }
        }


        function login() {
            vm.user.userName = vm.box1 + vm.box2 + vm.box3 + vm.box4;
            authService.login(vm.user).then(function (response) {
                localStorage.setItem('accessToken', response.data.token);
                $rootScope.$broadcast('loggedInSuccessfull')
                $location.path('/balance');
            }, function (err) {
                console.log(err);
                err.isLoginError = true;
                openMessage(err)
            });
        }

        function openMessage(error) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/features/message/message.html',
                controller: 'MessageController as vm',
                resolve: {
                    payload: function () {
                        return error;
                    }
                }
            });
        }

    }
})();