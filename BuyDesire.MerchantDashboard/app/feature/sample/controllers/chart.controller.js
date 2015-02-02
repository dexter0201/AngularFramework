(function () {
    'use strict';
    var controllerID = 'chartController';
    angular
        .module('app')
        .controller(controllerID, chartController);

    chartController.$inject = ['utils', '_', 'uiHelper', 'config'];
    function chartController(utils, _, uiHelper, config) {
        var vm = this;
        init();

        //#region exports

        //#endregion

        vm.addPoints = function () {
            var seriesArray = vm.chartConfig.series
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
        };

        vm.addSeries = function () {
            var rnd = []
            for (var i = 0; i < 10; i++) {
                rnd.push(Math.floor(Math.random() * 20) + 1)
            }
            vm.chartConfig.series.push({
                data: rnd
            })
        }

        vm.removeRandomSeries = function () {
            var seriesArray = vm.chartConfig.series
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray.splice(rndIdx, 1)
        }

        vm.toggleLoading = function () {
            this.chartConfig.loading = !this.chartConfig.loading
        }

        vm.chartConfig = {
            title: {
                text: 'Monthly Average Temperature',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: WorldClimate.com',
                x: -20
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
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