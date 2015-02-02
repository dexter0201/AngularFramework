(function () {
    'use strict';
    var controllerID = 'errorController';
    angular
        .module('app')
        .controller(controllerID, errorController);

    errorController.$inject = ['utils', '_', 'uiHelper', 'config'];
    function errorController(utils, _, uiHelper, config) {
        var vm = this;
        init();

        //#region exports
        _.extend(vm, {
        });
        //#endregion

        //#region private
        function init() {
            var promises = [updateUI()];
            uiHelper.activateController(promises, controllerID);
        }

        function updateUI() {
            uiHelper.setPageTitle(config.title.error);
            uiHelper.activeHeaderItem(0);
        }
        //#endregion
    }
})();