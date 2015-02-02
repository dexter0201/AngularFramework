(function () {
    'use strict';

    var modelID = 'baseResponseDTO';
    angular
        .module('app')
        .factory(modelID, baseResponseDTO);

    baseResponseDTO.$inject = ['_', 'utils'];
    function baseResponseDTO(_, utils) {
        //#region constructor
        var model = function (params, result) {
            var defaults = {
                StatusCode: null,
                Messages: null
            };
            _.extend(this, utils.pick(params, defaults));
            _.extend(this, { Result: _.extend(result, params.Result) });
        };
        //#endregion

        //#region exports
        _.extend(model.prototype, {
        });
        //#endregion

        //#region private
        //#endregion

        return model;
    }
})();