(function () {
    'use strict';
    var controllerID = 'homeBrandController';
    angular
        .module('app')
        .controller(controllerID, homeBrandController);

    homeBrandController.$inject = ['utils', '_', 'uiHelper', 'homeModel', 'retailerService'];
    function homeBrandController(utils, _, uiHelper, homeModel, retailerService) {
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
            vm.model.restoreData();
        }

        function btnCancelClicked() {
            homeModel.restoreData();
            uiHelper.hideModal();
        };

        function btnSaveClicked() {
            uiHelper.mask(true);
            retailerService.updateRetailerBrandDetail(vm.model.data).then(function (response) {
                uiHelper.mask(false);
                if (utils.isSuccessResponseDTO(response)) {
                    vm.model.backupData();
                    vm.model.data.IsBrandDetailsSetup = true;
                    uiHelper.hideModal();
                } else if (response.Messages.StorefrontDomain != '') {
                    vm.FailureStorefrontDomain = true;
                    vm.MessagesStorefrontDomain = response.Messages.StorefrontDomain;
                } 
            });
        };
        //#endregion
    }
})();