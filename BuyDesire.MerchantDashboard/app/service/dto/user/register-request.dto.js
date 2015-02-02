(function () {
    'use strict';

    var modelID = 'registerRequestDTO';
    angular
        .module('app')
        .factory(modelID, registerRequestDTO);

    registerRequestDTO.$inject = ['_', 'utils'];
    function registerRequestDTO(_, utils) {
        //#region constructor
        return function (params) {
            var defaults = {
                UserName: null,
                Email: null,
                Password: null,
                ConfirmPassword: null,
                StoreName: null,
                FullName: null,
                Address1: null,
                Address2: null,
                City: null,
                PostCode: null,
                StateName: null,
                CountryID: null,
                PhoneNumber: null
            };
            _.extend(this, utils.pick(params, defaults));
        };
        //#endregion
    }
})();