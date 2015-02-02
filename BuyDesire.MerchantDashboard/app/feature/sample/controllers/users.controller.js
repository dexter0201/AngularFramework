(function () {
    'use strict';

    var controllerID = 'usersController';
    angular
        .module('app')
        .controller(controllerID, usersController);

    usersController.$inject = ['utils', '_', 'uiHelper', 'usersModel', 'userService', '$scope'];
    function usersController(utils, _, uiHelper, usersModel, userService, $scope) {
        var vm = this;
        init();

        $scope.onClick = function (id) {
            utils.showInfo(_.template('Clicked to #{id} from [UserController]')({ id: id }));
        };

        //#region private
        function init() {
            var promises = [updateUI(), GetUsers()];
            uiHelper.activateController(promises, controllerID);
        }

        function updateUI() {
            uiHelper.setPageTitle('Users');
        }

        function GetUsers() {
            userService.getAll().then(function (response) {
                vm.model = new usersModel(response);
            });
        }
        //#endregion
    }
})();