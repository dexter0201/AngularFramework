(function () {
    'use strict';

    var modelID = 'updateRetailerLocationRequestDTO';
    angular
        .module('app')
        .factory(modelID, updateRetailerLocationRequestDTO);

    updateRetailerLocationRequestDTO.$inject = ['_', 'utils'];
    function updateRetailerLocationRequestDTO(_, utils) {
        //#region constructor
        var model = function (params) {
            var defaults = {
                RetailerStoreID: null,
                RetailerID: null,
                StoreCode: null,
                StoreName: null,
                AddressLine1: null,
                AddressLine2: null,
                City: null,
                StateID: null,
                PostCode: null,
                CountryID: null,
                PhoneNumber1: null,
                PhoneNumber2: null,
                MobileNumber: null,
                Fax: null,
                Website: null,
                EmailAddress: null,
                Hours: null,
                Description: null,
                Latitude: null,
                Longitude: null
            };
            _.extend(this, utils.pick(params, defaults));
        };
        //#endregion

        return model;
    }
})();