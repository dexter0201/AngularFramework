(function () {
    'use strict';
    var controllerID = 'addOptionController';
    angular
        .module('app')
        .controller(controllerID, addOptionController);

    addOptionController.$inject = ['utils', '_', 'uiHelper', 'locationModel', 'locationDetailModel'];
    function addOptionController(utils, _, uiHelper, locationModel, locationDetailModel) {
        var vm = this;
        init();

        //#region exports
        _.extend(vm, {
            addLocationDetailClick: addLocationDetailClick,
            btnCancelClicked: btnCancelClicked,
            btnImportCSVClicked: btnImportCSVClicked
        });
        //#endregion

        //#region private
        function init() {
            var promises = [getData()];
            uiHelper.activateController(promises, controllerID);
        }

        function getData() {
            
        }

        /**
         * Show popup Add new || Update location store detail
         * 
         */
        function addLocationDetailClick() {
            locationDetailModel.isEdit = false;
            uiHelper.hideModal();
            uiHelper.showModal(utils.viewPath('location', 'locations-form-detail'));
        }

        /**
         * Show popup Import CSVC
         * 
         */
        function btnImportCSVClicked() {
            uiHelper.hideModal();
            uiHelper.showModal(utils.viewPath('location', 'locations-import-csv'));
        }

        function btnCancelClicked() {
            // hideModalFromParentController();
            uiHelper.hideModal();
        }

        //#endregion
    }
})();