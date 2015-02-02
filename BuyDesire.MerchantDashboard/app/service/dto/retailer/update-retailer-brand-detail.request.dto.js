(function () {
    'use strict';

    var modelID = 'updateRetailerBrandDetailsRequestDTO';
    angular
        .module('app')
        .factory(modelID, updateRetailerBrandDetailsRequestDTO);

    updateRetailerBrandDetailsRequestDTO.$inject = ['_', 'utils'];
    function updateRetailerBrandDetailsRequestDTO(_, utils) {
        //#region constructor
        return function (params) {
            var defaults = {
                RetailerID: null,
                StorefrontDomain: null,
                Tagline: null,
                Description: null
            };
            _.extend(this, utils.pick(params, defaults));
        };
        //#endregion
    }
})();