(function () {
    'use strict';

    angular.module('ATMapp').controller('BalanceController', BalanceController);

    BalanceController.$inject = ['authService', '$location', '$rootScope'];

    /* @ngInject */
    function BalanceController(authService, $location, $rootScope) {
        /* jshint validthis: true */
        var vm = this;

        vm.panelVisibility = false;      

        vm.showPanel = showPanel;
        
        vm.withdrawMoney=withdrawMoney;

        function showPanel() {
             vm.panelVisibility = true;      
        }
        
        function withdrawMoney(){
            
        }
    }
})();