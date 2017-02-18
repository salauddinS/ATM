describe('Testing LoginController', function () {

    beforeEach(module('ATMapp'));

    var controller;
    var scope;

    beforeEach(angular.mock.module(function ($provide) {
        $provide.service('authService', function mockService($q) {
            return {
                login: function () {
                    var deferral = $q.defer();
                    deferral.resolve({ data: { token: 'sample_token' } });
                    return deferral.promise;
                }
            };
        });
    }));

    beforeEach(angular.mock.inject(function (_$controller_, $rootScope, authService) {
        scope = $rootScope.$new();
        authService = authService;
        controller = _$controller_('LoginController', {});
    }));

    it('should have a LoginController defined', function () {
        expect(controller).toBeDefined();
        expect(controller).not.toBe(null);
    });
    it('should call authService method and return data to controller', function () {
        controller.user = { cardNo: '123412341234123412341', pincode: '1234' }
        controller.login();
        scope.$digest();
        expect(localStorage.getItem('accessToken')).toEqual('sample_token');
    });
});