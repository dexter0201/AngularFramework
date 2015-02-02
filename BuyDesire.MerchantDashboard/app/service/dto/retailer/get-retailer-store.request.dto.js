(function () {
    'use strict';

    var modelID = 'getRetailerStoreRequestDTO';
    angular
        .module('app')
        .factory(modelID, getRetailerStoreRequestDTO);

    getRetailerStoreRequestDTO.$inject = ['_', 'utils'];
    function getRetailerStoreRequestDTO(_, utils) {
        //#region constructor
        return function (params) {
            var defaults = {
                RetailerID: null,
                PageIndex: null,
                PageSize: null
            };
            _.extend(this, utils.pick(params, defaults));
        };
        //#endregion
    }
})();