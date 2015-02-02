(function () {
    'use strict';
    var controllerID = 'forgotPasswordController';
    angular
        .module('app')
        .controller(controllerID, forgotPasswordController);

    forgotPasswordController.$inject = ['utils', '_', 'uiHelper', 'forgotPasswordModel', 'config', 'retailerService', 'userService'];
    function forgotPasswordController(utils, _, uiHelper, forgotPasswordModel, config, retailerService, userService) {
        var vm = this;
        vm.model = forgotPasswordModel;
        init();

        //#region exports
        _.extend(vm, {
            btnSubmitClicked: btnSubmitClicked
        });
        //#endregion

        //#region private
        function init() {
            var promises = [updateUI(), getData()];
            uiHelper.activateController(promises, controllerID);
        }

        function updateUI() {
            uiHelper.setPageTitle(config.title.forgot_password);
            uiHelper.activeHeaderItem(0);
        }

        function getData() {
        }

        function btnSubmitClicked() {
            uiHelper.mask(true);
            userService.forgotPassword(forgotPasswordModel).then(function (data) {
                uiHelper.mask(false);
                if (data.StatusCode === 100) {
                    vm.model.isSuccess = true;
                } else if (data.Messages) {
                    vm.model.isSuccess = false;
                }
            });
        }
        //#endregion
    }
})();