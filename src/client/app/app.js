(function () {
    'use strict';
    var app = angular.module('ATMapp', [
        'ui.bootstrap',
        'ui.router',
        'ui.bootstrap.tpls'
    ]);

    app.factory('httpRequestInterceptor', function () {
        return {
            request: function (config) {
                if (localStorage.getItem('accessToken') !== null) {
                    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
                }
                config.headers['Accept'] = 'application/json';
                return config;
            }
        };
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
    });
})();