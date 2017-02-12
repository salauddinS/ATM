(function () {
    'use strict';
    var app = angular.module('ATMapp', [
        'ui.bootstrap',
        'ui.router'
    ]);

    app.run(['$state', function ($state) {
        // Include $state to kick start the router.
    }]);
})();