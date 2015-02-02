(function () {
	'use strict';
	var controllerID = 'nhanSampleController';
	angular
        .module('app')
        .controller(controllerID, ControllerClass);

	ControllerClass.$inject = ['utils', '_', 'uiHelper', '$scope'];
	function ControllerClass(utils, _, uiHelper, $scope) {
	    $scope.someDate = new Date;
	    $scope.addDate = function (e) {
	        $scope.someDate.setDate($scope.someDate.getDate() + 1);
	        console.log($scope.someDate);
	    }
	};
})();