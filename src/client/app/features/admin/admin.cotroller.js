(function () {
    'use strict';

    angular.module('ATMapp').controller('AdminController', AdminController);

    AdminController.$inject = ['adminService', '$location', '$rootScope'];

    /* @ngInject */
    function AdminController(adminService, $location, $rootScope) {
        /* jshint validthis: true */
        var vm = this;
        vm.accountList = [];
        vm.account = {};
        vm.isAddEdit = false;
        vm.onEdit = onEdit;
        vm.onDelete = onDelete;
        vm.onAddClick = onAddClick;
        vm.onCancel = onCancel;
        vm.onSave = onSave;

        activate();

        function activate() {
            getAccountList();
        };

        function getAccountList() {
            adminService.getAccountList().then(function (response) {
                vm.accountList = response.data;
            }, function (err) {
                console.log(err);
            });
        }

        function showPanel() {
            vm.panelVisibility = true;
        }

        function onEdit(account) {
            vm.isAddEdit = true;
            vm.isEdit = true;
            vm.account = (JSON.parse(JSON.stringify(account)));
        }

        function onDelete(account) {
            adminService.deleteAccount(account).then(function (response) {
                vm.isAddEdit = false;
                vm.account = {};
                getAccountList();
            }, function (err) {
                console.log(err);
            });
        }
        function onAddClick(account) {
            vm.isAddEdit = true;
            vm.account = {};
        }
        function onCancel() {
            vm.isAddEdit = false;
            vm.isEdit = false;
            vm.account = {};
        }
        function onSave() {
            if (vm.isEdit) {
                adminService.editAccount(vm.account).then(function (response) {
                    vm.isAddEdit = false;
                    vm.isEdit = false;
                    getAccountList();
                    vm.account = {};
                }, function (err) {
                    console.log(err);
                });

            } else {
                adminService.saveAccount(vm.account).then(function (response) {
                    vm.isAddEdit = false;
                    getAccountList();
                    vm.account = {};
                }, function (err) {
                    console.log(err);
                });

            }
        }

    }
})();