(function () {
    'use strict';
    var controllerID = 'tosController';
    angular
        .module('app')
        .controller(controllerID, tosController);

    tosController.$inject = ['utils', '_', 'uiHelper', 'config'];
    function tosController(utils, _, uiHelper, config) {
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
            uiHelper.setPageTitle(config.title.tos);
            uiHelper.activeHeaderItem(0);
        }
        //#endregion
    }
})();