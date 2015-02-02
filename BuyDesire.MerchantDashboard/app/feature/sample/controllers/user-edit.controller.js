(function () {
    'use strict';
    var controllerID = 'userEditController';
    angular
        .module('app')
        .controller(controllerID, userEditController);

    userEditController.$inject = ['utils', '_', 'uiHelper', 'userModel', '$routeParams', 'userService', '$scope'];
    function userEditController(utils, _, uiHelper, userModel, $routeParams, userService, $scope) {
        var vm = this;
        init();
        
        //#region action
        vm.submitForm = function (isValid) {
            //utils.showWarning('validate : ' + isValid);
            utils.showInfo($scope.sampleProperty);
            $scope.sampleFunction();
            //var c = none.name;
        };
        $scope.onClick = function (id) {
            utils.showInfo(_.template('Clicked to #{id} from [UserEditController]')({id : id}));
        }
        //#endregion

        //#region private
        function init() {
            utils.inheritance('baseController', $scope);
            var promises = [updateUI(), GetUser()];
            uiHelper.activateController(promises, controllerID);
        }

        function updateUI() {
            uiHelper.setPageTitle('User > Edit');
        }

        function GetUser() {
            var id = $routeParams.id;
            if (id) {
                userService.getByID(id).then(function (response) {
                    vm.model = new userModel(response);
                });
            } else {
                vm.model = new userModel();
            }
        }
        //#endregion
    }
})();