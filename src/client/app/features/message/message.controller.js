(function () {
    'use strict';

    angular.module('ATMapp').controller('MessageController', MessageController);

    MessageController.$inject = ['$uibModalInstance', 'transaction', '$location', '$interval'];

    /* @ngInject */
    function MessageController($uibModalInstance, transaction, $location, $interval) {
        /* jshint validthis: true */
        var vm = this;
        var time;
        vm.transaction = transaction
        vm.counter = 10;
        vm.ok = ok;

        activate();

        function activate() {
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