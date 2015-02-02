(function () {
    'use strict';

    var modelID = 'updateRetailerPaymentDetailRequestDTO';
    angular
        .module('app')
        .factory(modelID, updateRetailerPaymentDetailRequestDTO);

    updateRetailerPaymentDetailRequestDTO.$inject = ['_', 'utils'];
    function updateRetailerPaymentDetailRequestDTO(_, utils) {
        //#region constructor
        var model = function (params) {
            var defaults = {
                RetailerID: null,
                Address1: null,
                Address2: null,
                City: null,
                StateName: null,
                PostCode: null,
                CountryID: null,
                PreferredPaymentMethodID: null,
                PayPalEmailAddress: null,
                BaseCurrencyCode: null
            };
            _.extend(this, utils.pick(params, defaults));
        };
        //#endregion

        return model;
    }
})();