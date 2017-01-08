describe('Service: biblioteca-concurseiro.QuestoesFactory', function () {

    // load the service's module
    beforeEach(module('biblioteca-concurseiro'));

    // instantiate service
    var service;

    //update the injection
    beforeEach(inject(function (_QuestoesFactory_) {
        service = _QuestoesFactory_;
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('should be injected and defined', function () {
        expect(service).toBeDefined();
    });
});
