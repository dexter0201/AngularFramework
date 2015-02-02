(function () {
    'use strict';

    var modelID = 'locationModel';
    angular
        .module('app')
        .factory(modelID, locationModel);

    locationModel.$inject = ['_', 'baseModel', 'config'];
    function locationModel(_, baseModel, config) {
        //#region exports

        //properties
        var shared = {
            data: null,
            markerTotal: 0,
            RetailerID: null,
            PageIndex: null,
            PageSize: null,
            CountCurrentRecord: 0
        }

        //methods
        _.extend(shared, {
            setData: setData
        });
        return shared;
        //#endregion

        //#region private
        function setData(data) {

        }
        //#endregion

    }
})();