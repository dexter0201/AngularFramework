(function () {
    'use strict';
    var controllerID = 'homeContactController';
    angular
        .module('app')
        .controller(controllerID, homeContactController);

    homeContactController.$inject = ['utils', '_', 'uiHelper', 'homeModel', 'retailerService'];
    function homeContactController(utils, _, uiHelper, homeModel, retailerService) {
        var vm = this;
        vm.model = homeModel;
        init();

        //#region exports
        _.extend(vm, {
            btnCancelClicked: btnCancelClicked,
            btnSaveClicked: btnSaveClicked
        });
        //#endregion

        //#region private
        function init() {
            var promises = [getData()];
            uiHelper.activateController(promises, controllerID);
        }

        function getData() {
        }

        function btnCancelClicked() {
            vm.model.restoreData();
            uiHelper.hideModal();
        };
        function btnSaveClicked() {
            uiHelper.mask(true);
            retailerService.updateRetailerContactDetail(vm.model.data).then(function (response) {
                uiHelper.mask(false);
                if (utils.isSuccessResponseDTO(response)) {
                    vm.model.data.IsContactDetailsSetup = true;
                    uiHelper.hideModal();
                } else {
                    //error
                }
            });
        };
        //#endregion
    }
})();