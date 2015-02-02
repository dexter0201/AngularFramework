(function () {
    'use strict';
    var controllerID = 'homePaymentController';
    angular
        .module('app')
        .controller(controllerID, homePaymentController);

    homePaymentController.$inject = ['utils', '_', 'uiHelper', 'homeModel','retailerService'];
    function homePaymentController(utils, _, uiHelper, homeModel, retailerService) {
        var vm = this;
        vm.model = homeModel;
        init();
        //#region exports
        _.extend(vm, {
            btnCancelClicked: btnCancelClicked,
            btnSaveClicked: btnSaveClicked,
            getMethodChoosen: getMethodChoosen
        });
        //#endregion

        //#region private
        function init() {
            var promises = [getData()];
            uiHelper.activateController(promises, controllerID);
        }

        function getData() {
        }

        function getMethodChoosen(value) {
            if (vm.model.data.PreferredPaymentMethodID == value)
                return 'active';
            return '';
        }


        function btnCancelClicked() {
            homeModel.restoreData();
            uiHelper.hideModal();
        };
        function btnSaveClicked() {
            uiHelper.mask(true);
            retailerService.updateRetailerPaymentDetail(homeModel.data).then(function(response){
                uiHelper.mask(false);
                if (utils.isSuccessResponseDTO(response)) {
                    homeModel.data.IsPaymentInformationSetup = true;
                    uiHelper.hideModal();
                }
                else {
                    // error
                }
            });
        };
        //#endregion
    }
})();