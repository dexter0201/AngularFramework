(function () {
	'use strict';
	var controllerID = 'tamSampleController';
	angular
        .module('app')
        .controller(controllerID, tamSampleController);

	tamSampleController.$inject = ['utils', '_', 'uiHelper', 'tamSampleModel'];

	function tamSampleController(utils, _, uiHelper, tamSampleModel) {
		var vm = this;
		init();
		
		_.extend(vm, {
		    btnSaveClicked: btnSaveClicked,
		    checkServerValidate: checkServerValidate
		});

		function btnSaveClicked() {
			alert('Valid form');
		}

		function checkServerValidate(value) {
            //hardcode
		    if (value === 'Tran Quoc Tam')
		        return false;
		    return false;
		}

		function init(){
			var promises = [updateUI(),getData()];
			uiHelper.activateController(promises, controllerID);
		}

		function getData() {
			vm.model = new tamSampleModel();
		}

		function updateUI() {
			uiHelper.setPageTitle('Tam - Sample');
		}
	}
})();