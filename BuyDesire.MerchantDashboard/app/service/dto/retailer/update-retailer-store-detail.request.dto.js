(function () {
    'use strict';

    var modelID = 'updateRetailerStoreDetailRequestDTO';
    angular
        .module('app')
        .factory(modelID, updateRetailerStoreDetailRequestDTO);

    updateRetailerStoreDetailRequestDTO.$inject = ['_', 'utils'];
    function updateRetailerStoreDetailRequestDTO(_, utils) {
        //#region constructor
        var model = function (params) {
            var defaults = {
                RetailerID: null,
                LogoImage: null,
                CoverImage: null,
                LogoImageUrl: null,
                CoverImageUrl: null
            };
            _.extend(this, utils.pick(params, defaults));
        };
        //#endregion

        return model;
    }
})();