(function () {
    'use strict';
    var controllerID = 'orderDetailsController';
    angular
        .module('app')
        .controller(controllerID, orderDetailsController);

    orderDetailsController.$inject = ['utils', '_', 'uiHelper', 'orderDetailsModel'];
    function orderDetailsController(utils, _, uiHelper, orderDetailsModel) {
        var vm = this;
        vm.model = orderDetailsModel;
        init();

        //#region exports
        _.extend(vm, {
            closeModal: closeModal,
            editItem: editItem
        });
        //#endregion

        //#region private
        function init() {
            var promises = [getData()];
            uiHelper.activateController(promises, controllerID);
        }

        function getData() {
            
        }

        function closeModal() {
            uiHelper.hideModal();
        }

        function editItem (itemID) {
            // body...
        }

        //#endregion
    }
})();