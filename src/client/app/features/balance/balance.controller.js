(function () {
    'use strict';

    angular.module('ATMapp').controller('BalanceController', BalanceController);

    BalanceController.$inject = ['atmService', '$location', '$rootScope', '$uibModal'];

    /* @ngInject */
    function BalanceController(atmService, $location, $rootScope, $uibModal) {
        /* jshint validthis: true */
        var vm = this;
        vm.panelVisibility = false;
        vm.isDisabled = false;
        vm.showPanel = showPanel;
        vm.withdrawMoney = withdrawMoney;
        vm.userDetail = {};
        vm.withdrawalAmt = '';

        activate();

        function activate() {
            getUserDetail();
        };

        function getUserDetail() {
            atmService.getUserDetail().then(function (response) {
                vm.userDetail = response.data;
            }, function (err) {
                console.log(err);
            });
        }

        function showPanel() {
            vm.panelVisibility = true;
        }

        function withdrawMoney() {
            if (isMultipleOfHundred()) {
                atmService.withdrawAmount({ amountToWithDraw: vm.withdrawalAmt }).then(function (response) {
                    console.log(response.data)
                    open(response.data);
                }, function (err) {
                    console.log(err);
                });
            }

        }

        function isMultipleOfHundred() {
            if (parseInt(vm.withdrawalAmt) % 100 === 0) {
                vm.isDisabled = false;
                return true;
            }
            else {
                vm.isDisabled = true;
                return false;
            }
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