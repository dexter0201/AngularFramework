(function () {
    'use strict';
    var controllerID = 'registerController';
    angular
        .module('app')
        .controller(controllerID, registerController);

    registerController.$inject = ['utils', '_', 'uiHelper', 'registerModel', 'config', 'retailerService', 'userService', 'authHelper', '$location'];
    function registerController(utils, _, uiHelper, registerModel, config, retailerService, userService, authHelper, $location) {
        var vm = this;
        vm.model = registerModel;
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
            uiHelper.setPageTitle(config.title.register);
            uiHelper.activeHeaderItem(0);
        }

        function getData() {
            retailerService.getAllCountries().then(function (data) {
                vm.model.countries = data.Result;
            });
        }

        function btnSubmitClicked() {
            uiHelper.mask(true);
            retailerService.checkRetailerStoreIsExisted(vm.model.StoreName).then(function (data) {
                uiHelper.mask(false);
                if (data.StatusCode === 102 || data.Result.IsExisted == true) {
                    vm.FailureStoreName = true;
                    vm.MessagesStoreName = data.Messages.StoreName;
                } else {
                    vm.FailureStoreName = false;
                    userService.register(registerModel).then(function (data) {
                        uiHelper.mask(false);
                        if (data.StatusCode && data.StatusCode === 102) { // fail to create user
                            console.log('failed to create user')
                            vm.failure = true;
                            vm.Messages = _.values(data.Messages)[0];
                        } else {
                            authHelper.setCurrentUser(data.Result);
                            $location.path('/');
                        }
                    });
                }
            });
        }
        //#endregion
    }
})();