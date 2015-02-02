(function () {
    'use strict';
    var controllerID = 'loginController';
    angular
        .module('app')
        .controller(controllerID, loginController);

    loginController.$inject = ['utils', '_', 'uiHelper', 'loginModel', 'config', 'retailerService', 'authHelper', '$location', 'userService', 'registerModel', 'forgotPasswordModel'];
    function loginController(utils, _, uiHelper, loginModel, config, retailerService, authHelper, $location, userService, registerModel, forgotPasswordModel) {
        var vm = this;
        vm.model = loginModel;
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
            uiHelper.setPageTitle(config.title.login);
            uiHelper.activeHeaderItem(0);
        }

        function getData() {
            clearOldData();
        }

        function btnSubmitClicked() {
            uiHelper.mask(true);
            userService.login(loginModel).then(function (data) {
                uiHelper.mask(false);
                if (!utils.isNull(data.Result)) {
                    authHelper.setCurrentUser(data.Result);
                    $location.path('/');
                } else if (!utils.isNull(data.Messages)) {
                    vm.failure = true;
                    vm.Messages = data.Messages.RetailerID;
                } else {
                    console.log('The server must support CORS requests and return an appropriate "Access-Control-Allow-Origin" header with the resource. See CORS for XHR in IE10 for more info about CORS in response headers');
                }
            });
        }

        function clearOldData () {
            forgotPasswordModel.setNull();
            registerModel.setNull();
        }
        //#endregion
    }
})();