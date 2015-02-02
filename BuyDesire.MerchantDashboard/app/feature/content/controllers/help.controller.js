(function () {
    'use strict';
    var controllerID = 'helpController';
    angular
        .module('app')
        .controller(controllerID, helpController);

    helpController.$inject = ['utils', '_', 'uiHelper', 'config'];
    function helpController(utils, _, uiHelper, config) {
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
            uiHelper.setPageTitle(config.title.help);
            uiHelper.activeHeaderItem(0);
        }
        //#endregion
    }
})();