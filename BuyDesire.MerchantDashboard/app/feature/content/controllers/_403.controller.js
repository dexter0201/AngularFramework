(function () {
    'use strict';
    var controllerID = '_403Controller';
    angular
        .module('app')
        .controller(controllerID, _403Controller);

    _403Controller.$inject = ['utils', '_', 'uiHelper', 'config'];
    function _403Controller(utils, _, uiHelper, config) {
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
            uiHelper.setPageTitle(config.title._403);
            uiHelper.activeHeaderItem(0);
        }
        //#endregion
    }
})();