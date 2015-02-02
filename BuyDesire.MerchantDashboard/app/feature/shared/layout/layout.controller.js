(function () {
    'use strict';

    var controllerID = 'layoutController';
    angular
        .module('app')
        .controller(controllerID, layoutController);

    layoutController.$inject = ['layoutModel'];
    function layoutController(layoutModel) {
        var vm = this;
        init();

        function init() {
            vm.model = new layoutModel();
        }
    };
})();