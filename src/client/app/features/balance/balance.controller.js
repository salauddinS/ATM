(function () {
    'use strict';

    angular.module('ATMapp').controller('BalanceController', BalanceController);

    BalanceController.$inject = ['atmService', '$location', '$rootScope'];

    /* @ngInject */
    function BalanceController(atmService, $location, $rootScope) {
        /* jshint validthis: true */
        var vm = this;
        vm.panelVisibility = false;
        vm.showPanel = showPanel;
        vm.withdrawMoney = withdrawMoney;
        vm.userDetail={};

        activate();

        function activate() {
            getUserDetail();
        };

        function getUserDetail() {
            atmService.getUserDetail().success(function (response) {
               vm.userDetail=response;
            }).error(function (err) {
                console.log(err);
            });
        }

        function showPanel() {
            vm.panelVisibility = true;
        }

        function withdrawMoney() {

        }
    }
})();