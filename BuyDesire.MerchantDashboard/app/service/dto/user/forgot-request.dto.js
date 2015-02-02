(function () {
    'use strict';

    var modelID = 'forgotRequestDTO';
    angular
        .module('app')
        .factory(modelID, forgotRequestDTO);

    forgotRequestDTO.$inject = ['_', 'utils'];
    function forgotRequestDTO(_, utils) {
        //#region constructor
        return function (params) {
            var defaults = {
                UserName: null,
                Email: null
            };
            _.extend(this, utils.pick(params, defaults));
        };
        //#endregion
    }
})();