(function () {
    'use strict';

    var modelID = 'loginRequestDTO';
    angular
        .module('app')
        .factory(modelID, loginRequestDTO);

    loginRequestDTO.$inject = ['_', 'utils'];
    function loginRequestDTO(_, utils) {
        //#region constructor
        return function (params) {
            var defaults = {
                UserName: null,
                Password: null
            };
            _.extend(this, utils.pick(params, defaults));
        };
        //#endregion
    }
})();