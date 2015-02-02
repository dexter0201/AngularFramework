(function () {
    'use strict';
    var controllerID = 'homeController';
    angular
        .module('app')
        .controller(controllerID, homeController);

    homeController.$inject = ['$timeout', 'utils', '_', 'uiHelper', 'homeModel', 'config', 'retailerService', 'currentUser', 'headerModel'];
    function homeController($timeout, utils, _, uiHelper, homeModel, config, retailerService, currentUser, headerModel) {
        var vm = this;
        vm.model = homeModel; 
        init();

        //#region exports
        _.extend(vm, {
            btnSetupClick: btnSetupClick,
            activePage: activePage,
            btnCompleteLaterClick: btnCompleteLaterClick
        });
        //#endregion

        //#region private
        function init() {
            var promises = [updateUI(), getData()];
            uiHelper.activateController(promises, controllerID);
        }

        function updateUI() {
            uiHelper.setPageTitle(config.title.home);
            uiHelper.activeHeaderItem(0);
        }

        /**
         * get Data when homepage is loaded
         * 
         * @return {none}
         */
        function getData() {
            if (!currentUser.isNull() && utils.isNull(vm.model.data)) {
                uiHelper.mask(true);
                retailerService.getRetailerInfo({ RetailerID: currentUser.RetailerID }).then(function (data) {
                    uiHelper.mask(false);
                    vm.model.data = data.Result;
                });
            }
            preloadNeededData();
        }

        function preloadNeededData() {
            utils.background(function () {
                if (utils.isNull(vm.model.countries)) {
                    retailerService.getAllCountries().then(function (data) {
                        vm.model.countries = data.Result;
                    });
                }
                if (utils.isNull(vm.model.paymentMethods)) {
                    retailerService.getAllPayoutMethods().then(function (data) {
                        vm.model.paymentMethods = data.Result;
                    });
                }
                if (utils.isNull(vm.model.currencies)) {
                    retailerService.getAllCurrencies().then(function (data) {
                        vm.model.currencies = data.Result;
                    });
                }
            });
        }

        function openPopup(index) {
            var pages = ['brand', 'contact', 'store', 'payment', 'payment-paypal'];
            var page = utils.viewPath('home', 'home-' + pages[index]);
            vm.model.backupData();
            uiHelper.showModal(page);
        }

        function btnSetupClick() {
            openPopup(0);
        }

        function activePage(index) {
            openPopup(index);
        };

        function btnCompleteLaterClick() {

        };
        //#endregion
    }
})();