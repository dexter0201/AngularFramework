//#region Recommended
(function () {
	'use strict';

	angular
        .module('app')
        .factory('constructorName', constructorName);

	constructorName.$inject = ['$q', '$rootScope'];//use $inject
	function constructorName($q, $rootScope) {
		
	}
})();
//#endregion





//#region Avoid
(function () {
    'use strict';

	angular
		.module('app')
		.controller('constructorName', ['$rootScope', constructorName]);//use array

	function constructorName($rootScope) {

	}
})();
//#endregion