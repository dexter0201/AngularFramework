(function () {
    'use strict';

    var moduleID = 'retailerRequestHelper';
    angular
        .module('app')
        .factory(moduleID, retailerRequestHelper);

    retailerRequestHelper.$inject = [
                                'getRetailerInfoRequestDTO',
                                'updateRetailerBrandDetailsRequestDTO',
                                'updateRetailerContactDetailsRequestDTO',
                                'updateRetailerStoreDetailRequestDTO',
                                'updateRetailerPaymentDetailRequestDTO'];
    function retailerRequestHelper(
                    getRetailerInfoRequestDTO,
                    updateRetailerBrandDetailsRequestDTO,
                    updateRetailerContactDetailsRequestDTO,
                    updateRetailerStoreDetailRequestDTO,
                    updateRetailerPaymentDetailRequestDTO) {
        //#region exports
        return {
            getRetailerInfoRequestDTO: getRetailerInfoRequestDTO,
            updateRetailerBrandDetailsRequestDTO: updateRetailerBrandDetailsRequestDTO,
            updateRetailerContactDetailsRequestDTO: updateRetailerContactDetailsRequestDTO,
            updateRetailerStoreDetailRequestDTO: updateRetailerStoreDetailRequestDTO,
            updateRetailerPaymentDetailRequestDTO: updateRetailerPaymentDetailRequestDTO
        };
        //#endregion
    }
})();