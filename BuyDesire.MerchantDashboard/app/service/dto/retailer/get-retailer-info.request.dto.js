(function () {
    'use strict';

    var modelID = 'getRetailerInfoRequestDTO';
    angular
        .module('app')
        .factory(modelID, getRetailerInfoRequestDTO);

    getRetailerInfoRequestDTO.$inject = ['_', 'utils'];
    function getRetailerInfoRequestDTO(_, utils) {
        //#region constructor
        return function (params) {
            var defaults = {
                RetailerID: null
            };
            _.extend(this, utils.pick(params, defaults));
        };
        //#endregion
    }
})();