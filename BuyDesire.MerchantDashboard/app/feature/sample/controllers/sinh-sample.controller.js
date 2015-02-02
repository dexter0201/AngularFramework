(function () {
    'use strict';
    var controllerID = 'sinhSampleController';
    angular
        .module('app')
        .controller(controllerID, sinhSampleController);

    sinhSampleController.$inject = ['utils', '_', 'uiHelper', 'sinhSampleModel', '$scope', 'retailerService', '$q', '$http'];
    function sinhSampleController(utils, _, uiHelper, sinhSampleModel, $scope, retailerService, $q, $http) {
        var vm = this;
        vm.model = sinhSampleModel;

        updateChart();

        _.extend(vm, {
            switchTime: switchTime,
            switchType: switchType,
            switchChart: switchChart
        });

        //#region Private
        function switchTime(value) {
            vm.model.selectedTime = value;
            updateChart();
        }
        function switchType(value) {
            vm.model.selectedType = value;
            updateChart();
        }
        function switchChart(value) {
            vm.model.selectedChart = value;
            updateChart();
        }
        function updateChart() {
            vm.model.chartSetting = getChartSetting();
        }
        function getChartSetting() {
            var chart = {};
            chart.type = getChartType(vm.model.selectedChart);
            chart.data = getSampleData(vm.model.selectedChart, vm.model.selectedTime);
            chart.options = getChartOption(vm.model.selectedChart);
            chart.formatters = {};
            return chart;
        }
        //#endregion

        //#region Data
        function getChartOption(selectedChart) {
            if (selectedChart == 0)
                return {
                    //title: 'Desires',
                    //hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                    width: '100%',
                    height: 480,
                    colors: ['#ffb100'],
                    series: {
                        0: { pointShape: 'circle' }//circle | triangle | square | diamond | star | polygon
                    },
                    legend: 'none',
                    pointSize: 18
                };
            else if (selectedChart == 1)
                return {
                    width: '100%',
                    height: 480,
                    displayMode: 'markers',
                    colorAxis: { colors: ['#fff8e6', '#f9b500'] }
                };
            else if (selectedChart == 2)
                return {
                    width: '100%',
                    height: 480,
                    colorAxis: { colors: ['#fff8e6', '#f9b500'] }
                };
        }
        function getChartType(selectedChart) {
            if (selectedChart == 0)
                return 'AreaChart';
            else
                return 'GeoChart';
        }
        function getSampleData(selectedChart, selectedTime) {
            if (selectedChart == 0) {
                var init = [['Year', 'Sales']];
                var sample = [];
                if (selectedTime == 0)
                    sample = getSampleDaily();
                if (selectedTime == 1)
                    sample = getSampleWeekly();
                if (selectedTime == 2)
                    sample = getSampleMonthly();
                return init.concat(sample);
            } else{
                var init = [['Country', 'Views']];
                var sample = getRandomByLocation();
                return init.concat(sample);
            }
        }

        function getSampleDaily() {
            return getRandomData(12, 1);
        }

        function getSampleWeekly() {
            return getRandomData(12, 7);
        }

        function getSampleMonthly() {
            return getRandomData(12, 30);
        }

        function getRandomData(limit, step) {
            var result = [];
            var date = new Date();
            for (var i = 0; i < limit; i++) {
                var day = date.getDate();
                var month = date.getMonth() + 1;
                var data = [];
                data.push(day + '/' + month);
                data.push(getRandomInt());
                result.push(data);
                date.setDate(date.getDate() - step);
            }
            return result.reverse();
        }

        function getRandomInt() {
            return Math.round(Math.random() * 16000);
        }

        function getRandomByLocation() {
            var locations = ['Germany', 'United States', 'Brazil',
                'Canada', 'France', 'Viet Nam',
                'ThaiLand', 'Australia', 'Japan', 'United Kingdom', 'Russia',
                'Arghentina','NewZealand',
                'China', 'Hong Kong', 'Singapo'];
            var result = [];
            for (var i = 0, j = locations.length; i < j; i++){
                var data = [];
                data.push(locations[i]);
                data.push(getRandomInt());
                result.push(data);
            }
            return result;
        }

        //#endregion
    }
})();