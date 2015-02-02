(function () {
    'use strict';

    var modelID = 'productImportCSVModel';
    angular
        .module('app')
        .factory(modelID, productImportCSVModel);

    productImportCSVModel.$inject = ['_', 'baseModel', 'config'];
    function productImportCSVModel(_, baseModel, config) {
        //#region exports

        //properties
        var shared = {
            file: null,
            sessionID: null,
            successPercent: 0,
            failurePercent: 0,

            //validate
            showError: false,
            invalidFile: false,
            inprogress: false
        }

        //methods
        _.extend(shared, {

        });
        return shared;
        //#endregion

        //#region private

        //#endregion
    }
})();