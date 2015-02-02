(function () {
	'use strict';
	var controllerID = 'lichnguyenTestController';
	angular
        .module('app')
        .controller(controllerID, ControllerClass);

	ControllerClass.$inject = ['utils', '_', 'uiHelper', '$scope'];
	function ControllerClass(utils, _, uiHelper, $scope) {
		var vm = this;
		init();

		//#region action
		vm.save = function () {
			if (vm.lichForm.$valid) {
				alert('User saved');
			} else {
				alert('Invalid fields');
			}
		};

		vm.reset = function () {
			vm.user = { name: '', email: '' };
		};
		//#endregion
		function init() {
			//utils.inheritance('baseController');
			
		}
		//#region private
		
		//#endregion
	}
})();