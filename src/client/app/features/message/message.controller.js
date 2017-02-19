(function () {
    'use strict';

    angular.module('ATMapp').controller('MessageController', MessageController);

    MessageController.$inject = ['$uibModalInstance', 'payload', '$location', '$interval'];

    /* @ngInject */
    function MessageController($uibModalInstance, payload, $location, $interval) {
        /* jshint validthis: true */
        var vm = this;
        var time;
        vm.isLoginError=false;
        vm.payload = payload
        vm.counter = 10;
        vm.ok = ok;

        activate();

        function activate() {
            if(vm.payload.isLoginError) {
                vm.isLoginError=true;
            }
            time = $interval(function () {
                if (vm.counter === 1) {
                    vm.ok();
                }
                vm.counter--;
            }, 1000)
        }
        function ok() {
            $interval.cancel(time)
            localStorage.clear();
            $uibModalInstance.dismiss('cancel');
            $location.path('/login');
        }
    }
})();