(function () {
    'use strict';

    var modelID = 'locationImportCSVModel';
    angular
        .module('app')
        .factory(modelID, locationImportCSVModel);

    locationImportCSVModel.$inject = ['_', 'baseModel', 'config'];
    function locationImportCSVModel(_, baseModel, config) {
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