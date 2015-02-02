(function () {
    'use strict';

    var modelID = 'ordersModel';
    angular
        .module('app')
        .factory(modelID, ordersModel);

    ordersModel.$inject = ['_', 'baseModel', 'config'];
    function ordersModel(_, baseModel, config) {
        //properties
        var shared = {
            data: null,
            allOrder: null,
            activeOrder: null,
            completedOrder: null,
            CancelledOrder: null,
            RetailerID: null,
            PageIndex: null,
            PageSize: null
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