(function () {
    'use strict';

    var modelID = 'addOptionModel';
    angular
        .module('app')
        .factory(modelID, addOptionModel);

    addOptionModel.$inject = ['_', 'baseModel', 'config'];
    function addOptionModel(_, baseModel, config) {
        //#region exports

        //properties
        var shared = {
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