describe('Testing BalanceController', function () {

    beforeEach(module('ATMapp'));

    var controller;
    var scope;

    beforeEach(angular.mock.module(function ($provide) {
        $provide.service('atmService', function mockService($q) {
            return {
                getUserDetail: function () {
                    var deferral = $q.defer();
                    deferral.resolve({ data: { userName: 'Jhon',currentBalance:5000 } });
                    return deferral.promise;
                }
            };
        });
    }));

    beforeEach(angular.mock.inject(function (_$controller_, $rootScope, atmService) {
        scope = $rootScope.$new();
        atmService = atmService;
        controller = _$controller_('BalanceController', {});
    }));

    it('should have a BalanceController defined', function () {
        expect(controller).toBeDefined();
        expect(controller).not.toBe(null);
    });
    it('should have a withdrawal panel visible after calling showPanel()', function () {
        expect(controller.panelVisibility).toBe(false);
        controller.showPanel();
        expect(controller.panelVisibility).toBe(true);
    });
    
    it('should call atmService method and return data to controller', function () {
        scope.$digest();
        expect(controller.userDetail.userName).toEqual('Jhon');
        expect(controller.userDetail.currentBalance).toEqual(5000);
    });
});