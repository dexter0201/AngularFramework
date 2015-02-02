(function () {
    'use strict';
    var controllerID = '_404Controller';
    angular
        .module('app')
        .controller(controllerID, _404Controller);

    _404Controller.$inject = ['utils', '_', 'uiHelper', 'config'];
    function _404Controller(utils, _, uiHelper, config) {
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
            uiHelper.setPageTitle(config.title._404);
            uiHelper.activeHeaderItem(0);
        }
        //#endregion
    }
})();