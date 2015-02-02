(function () {
    'use strict';

    var modelID = 'datePickerModel';
    angular
        .module('app')
        .factory(modelID, datePickerModel);

    datePickerModel.$inject = ['_'];
    function datePickerModel(_) {
        //#region exports
        var model = {
            dateOptions: null,
            formats: null,
            format: null,
            dt: null,
            minDate: null,
            opened: null
        }

        _.extend(model, {
        });
        return model;
        //#endregion

        //#region exports


        //#endregion
    }
})();