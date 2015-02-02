(function () {
    'use strict';
    var controllerID = 'baseController';
    angular
        .module('app')
        .controller(controllerID, baseController);

    baseController.$inject = ['$scope', 'utils'];
    function baseController($scope, utils) {



        //#region private

        //#endregion
    }
})();