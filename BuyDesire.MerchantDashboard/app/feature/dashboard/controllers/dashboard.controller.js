(function () {
    'use strict';
    var controllerID = 'dashboardController';
    angular
        .module('app')
        .controller(controllerID, dashboardController);

    dashboardController.$inject = ['utils', '_', 'uiHelper', 'dashboardModel', '$scope', 'reportService', '$q', '$http', 'config'];
    function dashboardController(utils, _, uiHelper, dashboardModel, $scope, reportService, $q, $http, config) {

        //#region exports
        var vm = this;
        vm.model = dashboardModel;
        init();

        _.extend(vm, {
            switchTime: switchTime,
            switchType: switchType,
            switchChart: switchChart,
            openStartDate: openStartDate,
            openEndDate: openEndDate,
            switchTab: switchTab,
            getTypeString: getTypeString
        });
        //#endregion

        //#region Private
        function init() {
            $scope.Math = window.Math;
            if (vm.model.hasData()) {
                vm.model.updateUI();
            } else {
                uiHelper.mask(true);
                vm.model.getReportByDate().then(function (data) {
                    uiHelper.mask(false);
                    vm.model.updateUI();
                });
                utils.background(function () {
                    vm.model.getReportByLocation().then(function (data) {
                    });
                });
            }
            var promises = [updateUIPage()];
            uiHelper.activateController(promises, controllerID);
        }

        function updateUIPage() {
            uiHelper.setPageTitle(config.title.dashBoard);
            uiHelper.activeHeaderItem(1);
        }

        function switchTime(value) {
            vm.model.selectedTime = value;
            if (vm.model.isSpecificDate() && !vm.model.hasSpecificDateData()) {
                uiHelper.mask(true);
                vm.model.getReportByDate(vm.model.selectedStartDate, vm.model.selectedEndDate).then(function (data) {
                    uiHelper.mask(false);
                    vm.model.updateUI();
                });
                utils.background(function () {
                    vm.model.getReportByLocation(vm.model.selectedStartDate, vm.model.selectedEndDate).then(function (data) {
                    });
                });
            } else {
                vm.model.updateUI();
            }
        }

        /**
         * switchType view
         * 
         * @param  {integer} value    Chart view code
         * @return {none}
         */
        function switchType(value) {
            vm.model.selectedType = value;
            vm.model.updateUI();
        }

        /**
         * get selected type as string
         * 
         * @return {string}
         */
        function getTypeString () {
            var selectedType = vm.model.getSelectedTypeAsString();
            return selectedType.charAt(0).toUpperCase()
                    + selectedType.slice(1);
        }

        /**
         * switch chart
         * 
         * @param  {integer} value    Chart code 
         * @return {none}
         */
        function switchChart(value) {
            vm.model.selectedChart = value;
            vm.model.updateUI();
        }

        function switchTab (_value) {
            _.each(vm.model.chartTabs, function (value, index) {
                vm.model.chartTabs[index] = index === _value ? true : false;
            });
        }
        //#endregion

        //#region DateTime Picker
        function openStartDate($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.model.openStartDate = true;
            vm.model.openEndDate = false;
        };

        function openEndDate($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.model.openEndDate = true;
            vm.model.openStartDate = false;
        };
        //#endregion
    }
})();