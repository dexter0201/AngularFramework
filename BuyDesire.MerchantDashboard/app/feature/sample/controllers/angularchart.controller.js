(function () {
    'use strict';
    var controllerID = 'angularchartController';
    angular
        .module('app')
        .controller(controllerID, angularchartController);

    angularchartController.$inject = ['$scope', 'utils', '_', 'uiHelper', 'config'];
    function angularchartController($scope, utils, _, uiHelper, config) {
        var vm = this;
        init();

        //#region exports

        $scope.data = {
            series: ['Sales', 'Income', 'Expense', 'Laptops', 'Keyboards'],
            data: [{
                x: "Sales",
                y: [100, 500, 0],
                tooltip: "this is tooltip"
            },
            {
                x: "Not Sales",
                y: [300, 100, 100]
            },
            {
                x: "Tax",
                y: [351]
            },
            {
                x: "Not Tax",
                y: [54, 0, 879]
            }]
        }

        $scope.chartType = 'line';

        $scope.config = {
            labels: false,
            title: "Not Products",
            legend: {
                display: true,
                position: 'left'
            }
        }

        //#region private
        function init() {
            var promises = [updateUI()];
            uiHelper.activateController(promises, controllerID);
        }

        function updateUI() {
            uiHelper.setPageTitle(config.title.dashBoard);
            uiHelper.activeHeaderItem(1);
        }
        //#endregion
    }
})();