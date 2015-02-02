(function () {
    'use strict';

    var modelID = 'updateRetailerContactDetailsRequestDTO';
    angular
        .module('app')
        .factory(modelID, updateRetailerContactDetailsRequestDTO);

    updateRetailerContactDetailsRequestDTO.$inject = ['_', 'utils'];
    function updateRetailerContactDetailsRequestDTO(_, utils) {
        //#region constructor
        var model = function (params) {
            var defaults = {
                RetailerID: null,
                EmailAddress: null,
                WebsiteURL: null,
                PhoneNumber: null
            };
            _.extend(this, utils.pick(params, defaults));
        };
        //#endregion

        return model;
    }
})();