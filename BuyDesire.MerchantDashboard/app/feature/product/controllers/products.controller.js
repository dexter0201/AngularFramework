(function () {
    'use strict';
    var controllerID = 'productsController';
    angular
        .module('app')
        .controller(controllerID, productsController);

    productsController.$inject = ['$scope', 'utils', '_', 'uiHelper', 'config', 'storeService', 'currentUser', 'locationModel', '$sce', 'GoogleMapApi'.ns(), 'locationDetailModel'];
    function productsController($scope, utils, _, uiHelper, config, storeService, currentUser, locationModel, $sce, GoogleMapApi, locationDetailModel) {
        var vm = this;
        vm.model = locationModel;

        init();
        //#region exports
        _.extend(vm, {
            addProductClick: addProductClick
        });
        //#endregion

        //#region private
        function init() {
            var promises = [updateUI(), getData()];
            uiHelper.activateController(promises, controllerID);
        }

        function updateUI() {
            uiHelper.setPageTitle(config.title.product);
            uiHelper.activeHeaderItem(3);
        }

        function getData() {
        }

        function addProductClick() {
            uiHelper.showModal(utils.viewPath('product', 'product-import-csv'));
        }
        //#endregion
    }
})();