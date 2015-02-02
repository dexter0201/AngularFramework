(function () {
    'use strict';

    var controllerID = 'controllerID';
    angular
        .module('app')
        .controller(controllerID, controllerName);//controllerName is the same with controllerID

    controllerName.$inject = ['utils', 'uiHelper'];
    function controllerName(utils, uiHelper) {
        var vm = this;
        init();

        //#region action
        vm.btnSubmitClicked = function () {
        };
        vm.btnLoginClicked = function () {
        };
        vm.iconShareClicked = function () {
        };
        //#endregion

        //#region private
        function init() {
            var promises = [updateUI(), getData(), otherFunction()];
            uiHelper.activateController(promises, controllerID);
        }

        function updateUI() {
            uiHelper.setPageTitle('Page Title');
            //update other UI components
        }

        function getData() {
            //get data via service if needed
        }

        function otherFunction() {
            //
        }
        //#endregion
    }
})();