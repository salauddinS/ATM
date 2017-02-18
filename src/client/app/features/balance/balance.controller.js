(function () {
    'use strict';

    angular.module('ATMapp').controller('BalanceController', BalanceController);

    BalanceController.$inject = ['atmService', '$location', '$rootScope', '$uibModal'];

    /* @ngInject */
    function BalanceController(atmService, $location, $rootScope, $uibModal) {
        /* jshint validthis: true */
        var vm = this;
        vm.panelVisibility = false;
        vm.showPanel = showPanel;
        vm.withdrawMoney = withdrawMoney;
        vm.userDetail = {};
        vm.withdrawalAmt = '';

        activate();

        function activate() {
            getUserDetail();
        };

        function getUserDetail() {
            atmService.getUserDetail().success(function (response) {
                vm.userDetail = response;
            }).error(function (err) {
                console.log(err);
            });
        }

        function showPanel() {
            vm.panelVisibility = true;
        }

        function withdrawMoney() {
            atmService.checkAmount({ amountToWithDraw: vm.withdrawalAmt }).success(function (response) {
                console.log(response)
                open(response);
            }).error(function (err) {
                console.log(err);
            });
        }
        function open(transaction) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/features/message/message.html',
                controller: 'MessageController as vm',
                resolve: {
                    transaction: function () {
                        return transaction;
                    }
                }
            });
        }
    }
})();