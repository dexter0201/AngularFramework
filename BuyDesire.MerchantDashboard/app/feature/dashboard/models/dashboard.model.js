(function () {
    'use strict';

    var modelID = 'dashboardModel';
    angular
        .module('app')
        .factory(modelID, dashboardModel);

    dashboardModel.$inject = ['_', 'baseModel', 'config', 'reportService', 'utils', '$q'];
    function dashboardModel(_, baseModel, config, reportService, utils, $q) {

        //#region exports
        var model = {
            //enum
            eTime: {
                daily: 0,
                weekly: 1,
                monthly: 2,
                specific: 3
            },
            eType: {
                views: 0,
                tags: 1,
                desires: 2,
                orders: 3,
                sales: 4
            },
            eChart: {
                area: 0,
                geo: 1
            },

            //api data
            apiData: {
                area: null,
                geo: null,
                areaSpecificDate: null,
                geoSpecificDate: null
            },


            //State
            selectedChart: 0,
            selectedTime: 0,
            selectedType: 0,
            selectedStartDate: '01/01/2013',
            selectedEndDate: '01/01/2014',
            openStartDate: null,
            openEndDate:null,

            //bind to trending UI
            trending: {
                views: {
                    increase: 0,
                    increasePercent: 0
                },
                tags: {
                    increase: 0,
                    increasePercent: 0
                },
                desires: {
                    increase: 0,
                    increasePercent: 0
                },
                orders: {
                    increase: 0,
                    increasePercent: 0
                },
                sales: {
                    increase: 0,
                    increasePercent: 0
                }
            },

            //bind to chart UI
            chart: {
                type: null,
                data: null,
                options: null,
                formatters: {}
            },

            chartTabs: {
                Views: true,
                Tags: false,
                Desires: false,
                Orders: false,
                Sales: false
            },

            topCountries: null
        }

        _.extend(model, {
            getChartOption: getChartOption,
            getChartType: getChartType,
            setChartData: setChartData,
            updateTrending: updateTrending,
            isSpecificDate: isSpecificDate,
            getSelectedTypeAsString: getSelectedTypeAsString,

            //data
            getReportByDate: getReportByDate,
            getReportByLocation: getReportByLocation,
            preLoadData: preLoadData,

            //ui
            updateUI: updateUI,
            hasData: hasData,
            hasSpecificDateData: hasSpecificDateData
        });
        return model;
        //#endregion

        //#region Get data via API
        function getReportByDate(startDate, endDate) {
            return reportService.getReportByDate(startDate, endDate).then(function (data) {
                if (utils.isNull(startDate)) {
                    // request !== specific dates
                    model.apiData.area = data;
                } else {
                    // request specific dates
                    model.apiData.areaSpecificDate = data;
                }
                return data;
            });
        }

        function getReportByLocation(startDate, endDate) {
            return reportService.getReportByLocation(startDate, endDate).then(function (data) {
                if (utils.isNull(startDate))
                    model.apiData.geo = data;
                else
                    model.apiData.geoSpecificDate = data;
                return data;
            });
        }

        function preLoadData() {
            if (utils.isNull(model.apiData.area)) {
                utils.background(function () {
                    getReportByDate();
                    getReportByLocation();
                });
            }
        }
        //#endregion

        //#region Trending
        
        /**
         * update trending
         * 
         * @param  {json}   data    New trending data
         * @return {none}
         */
        function updateTrending(data) {
            //  current trending data
            var trending = model.trending;
            var typeName = ['Views', 'Desires', 'Tags', 'Orders', 'Sales'];
            var types = [trending.views, trending.tags, trending.desires, trending.orders, trending.sales];
            _.each(data, function (e) {
                mapTrendingItem(types[_.indexOf(typeName, e.TrendingType)], e.TrendingData);
            });

        }

        function mapTrendingItem(item, data) {
            item.increase = data.Increase;
            item.increasePercent = data.IncreasePercent;
        }
        //#endregion

        //#region Chart Options
        
        /**
         * get chart type
         * 
         * @param  {integer} value The id of type
         * @return {string}       The string of type
         */
        function getChartType(value) {
            return value == model.eChart.geo ? 'GeoChart' : 'AreaChart';
        }

        /**
         * get chart option
         * 
         * @param  {integer} value    The id of type
         * @return {json}             The options of Chart
         */
        function getChartOption(value) {
            return value == model.eChart.geo ? geoChartOption() : areaChartOption();
        }

        /**
         * get area chart option
         * 
         * @return {json} The options of Chart
         */
        function areaChartOption() {
            return {
                width: '100%',
                height: 480,
                colors: ['#ffb100'],
                series: {
                    0: {
                        pointShape: 'circle',//circle | triangle | square | diamond | star | polygon
                        color: '#ffb100',
                        lineWidth: 1
                    }
                },
                hAxis: {
                    baselineColor: '#ffb100',
                    direction: 1,
                    format: 'dd/MM',
                    textStyle: {
                        color: '#666'
                    },
                    gridlines: {
                        color: '#ffb100',
                        count: 12
                    },
                    minorGridlines: {
                        color: '#efefef',
                        count: 4
                    }
                },
                vAxis: {
                    baselineColor: '#ffb100',
                    textStyle: {
                        color: '#666'
                    },
                    gridlines: {
                        color: '#ffb100',
                        count: 5
                    },
                    minorGridlines: {
                        color: '#efefef',
                        count: 4
                    },
                    viewWindowMode: "explicit", viewWindow: { min: 0 }
                },
                legend: 'none',
                tooltip: { isHtml: true },
                pointSize: 5
            };
        }

        /**
         * get geo chart options
         * 
         * @return {json} The options of Chart
         */
        function geoChartOption() {
            return {
                width: '100%',
                height: 480,
                //displayMode: 'markers',
                legend: 'none',
                tooltip: { isHtml: true },
                colorAxis: { colors: ['#fff8e6', '#f9b500'] }
            };
        }

        /**
         * set chart data
         * 
         * @param {array} data The data for chart view
         */
        function setChartData(data) {
            var init = [['DataType', 'DataValue', { 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } }]];
            model.chart.data = init.concat(data);
        }

        /**
         * update chart option
         *     - set chart type
         *     - set chart option
         * 
         * @return {none}
         */
        function updateChartOption() {
            model.chart.type = getChartType(model.selectedChart);
            model.chart.options = getChartOption(model.selectedChart);
        }
        //#endregion

        //#region Data Helper
        
        /**
         * check selected specifical date
         * 
         * @return {Boolean}
         */
        function isSpecificDate() {
            return model.selectedTime == model.eTime.specific;
        }

        /**
         * check selected show area chart
         * 
         * @return {Boolean}
         */
        function isSelectedAreaChart() {
            return model.selectedChart == model.eChart.area;
        }

        /**
         * check selected show area chart
         * 
         * @return {Boolean}
         */
        function isSelectedGeoChart() {
            return model.selectedChart == model.eChart.geo;
        }

        /**
         * get api data responsive
         * 
         * @return {json} The API data responsive
         */
        function getDataByChartDateAndType() {
            if (!isSpecificDate()) {
                return isSelectedAreaChart() ? model.apiData.area : model.apiData.geo;
            } else {
                return isSelectedAreaChart() ? model.apiData.areaSpecificDate : model.apiData.geoSpecificDate;
            }
        }

        /**
         * get data by time: daily || weekly || monthly || specific
         * 
         * @return {json}
         */
        function getDataByTime() {
            // get api data responsive
            var suitableData = getDataByChartDateAndType();

            if (model.selectedTime === model.eTime.daily)
                return suitableData.Result.DailyData;
            if (model.selectedTime === model.eTime.weekly)
                return suitableData.Result.WeeklyData;
            if (model.selectedTime === model.eTime.monthly)
                return suitableData.Result.MonthlyData;
            if (model.selectedTime === model.eTime.specific)
                return suitableData.Result.DailyData;
        }

        /**
         * get trending
         * 
         * @return {json}
         */
        function getTrending() {
            // get data
            var timingData = getDataByTime();
            return !utils.isNull(timingData) ? timingData.Trending : {};
        }

        /**
         * get chart data
         * 
         * @return {json}
         */
        function getChartData() {
            var timingData = getDataByTime();
            return timingData ? timingData.Data : {};
        }

        /**
         * get value by selected type
         * 
         * @param  {json}   data    The data of chart
         * @return {integer}        Selected type count
         */
        function getValueByType(data) {
            if (model.selectedType === model.eType.views)
                return data.ViewsCount;
            if (model.selectedType === model.eType.tags)
                return data.TagsCount;
            if (model.selectedType === model.eType.desires)
                return data.DesiresCount;
            if (model.selectedType === model.eType.orders)
                return data.OrdersCount;
            if (model.selectedType === model.eType.sales)
                return data.SalesCount;
        }

        /**
         * date time format
         * 
         * @param  {string} value The string as datetime
         * @return {Date}         The Datetime object
         */
        function dateTimeFormat(value) {
            var date = value.substring(0, 2);
            var month = value.substring(3, 5);
            var year = value.substring(6, 10);
            month = parseInt(month) - 1;
            date = parseInt(date);
            return new Date(year, month, date);
        }
        //#endregion

        //#region Chart Data
        
        /**
         * update area chart data
         * 
         * @param  {json} chartData New area chart data
         * @return {none}           
         */
        function updateAreaChartData(chartData) {
            var result = [];
            _.each(chartData, function (e) {
                var chartItem = [];
                if (!utils.isNull(e.ReportDate)) {
                    var date = dateTimeFormat(e.ReportDate);
                    chartItem.push(date);
                    var value = getValueByType(e);
                    chartItem.push(value);
                    chartItem.push(areaChartTooltip(date.getDate() + '/' + (date.getMonth() + 1), value));
                    result.push(chartItem);
                    /*
                        chartItem: [date, integer, string tooltip]
                     */
                }
            });
            setChartData(result);
        }

        /**
         * update geo chart data
         * 
         * @param  {json} chartData New geo chart data
         * @return {none}           
         */
        function updateAreaGeoData(chartData) {
            var result = [];
            if (_.isArray(chartData) && chartData.length > 0) {
                var geoChartData = chartData[0].DataGeo;
                if (_.isArray(geoChartData) && chartData.length > 0) {
                    _.each(geoChartData, function (e) {
                        var chartItem = [];
                        chartItem.push(e.CountryName);
                        var value = getValueByType(e);
                        chartItem.push(value);
                        chartItem.push(geoChartTooltip(value));
                        result.push(chartItem);
                    });
                }
            }
            setChartData(result);
        }

        /**
         * sort custom
         * 
         * @param  {string} filed   The filed value want to sort
         * @param  {boolen} reverse True/false
         * @param  {mix} primer     ParseInt,..
         * @return {mix}
         */
        function sortCustom (filed, reverse, primer) {
            var key = primer ? function (x) { return primer(x[filed]) }
                            : function (x) { return x[filed] };

            reverse = [-1, 1][+!!reverse];

            return function (a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
        }

        /**
         * get top countries by selected value
         * 
         * @param  {json} chartData
         * @return {array}           The top country
         */
        function getTopCountriesBySelectedValue (chartData) {
            var filedSort = '';
            if (model.selectedType === model.eType.views)
                filedSort = 'ViewsCount';
            if (model.selectedType === model.eType.tags)
                filedSort = 'TagsCount';
            if (model.selectedType === model.eType.desires)
                filedSort = 'DesiresCount';
            if (model.selectedType === model.eType.orders)
                filedSort = 'OrdersCount';
            if (model.selectedType === model.eType.sales)
                filedSort = 'SalesCount';

            _.first(chartData).DataGeo.sort(sortCustom(filedSort, false, parseInt));

            var results = [];
            
            for (var i = 0; i < (_.first(chartData).DataGeo.length < 5 ? _.first(chartData).DataGeo.length : 5); i++) {
                results.push({
                    CountryName: _.first(chartData).DataGeo[i]['CountryName'],
                    Value: _.first(chartData).DataGeo[i][filedSort]
                });
            };

            return results;
        }

        

        /**
         * update chart data
         * 
         * @param  {json}   chartData   New chart data
         * @return {none}
         */
        function updateChartData(chartData) {
            if (isSelectedAreaChart()) {
                updateAreaChartData(chartData);
            } else {
                updateAreaGeoData(chartData);
                model.topCountries = getTopCountriesBySelectedValue(chartData);
            }
        }

        /**
         * set area chart tooltip
         * 
         * @param  {string}     key
         * @param  {integer}    value
         * @return {string}
         */
        function areaChartTooltip(key, value) {
            return '<div style="width: 100px; text-align: center;">' +
                        //'<b style="color:#ff0000; font-size:18px;">' + key + '</b><br/>' +
                        '<b style="color:#ffb100; font-size:14px;">' + value + ' ' + getSelectedTypeAsString() + '</b>' +
                    '</div>';
        }

        function getSelectedTypeAsString() {
            var type = '';
            if (model.selectedType == model.eType.views)
                type = 'views';
            if (model.selectedType == model.eType.tags)
                type = 'tags';
            if (model.selectedType == model.eType.desires)
                type = 'desires';
            if (model.selectedType == model.eType.orders)
                type = 'orders';
            if (model.selectedType == model.eType.sales)
                type = 'sales';
            return type;
        }

        function geoChartTooltip(value) {
            return '<div>' +
                        //'<b style="color:#ffb100; font-size:14px;">' +
                        value + ' ' + getSelectedTypeAsString() + '</b>' +
                    '</div>';
        }

        function updateUI() {
            // update chart type & chart option
            updateChartOption();
            var trending = getTrending();
            var data = getChartData();
            updateTrending(trending);
            updateChartData(data);
        }

        /**
         * check data is exist
         * 
         * @return {Boolean}
         */
        function hasData() {
            return (!utils.isNull(model.apiData.area) && !utils.isNull(model.apiData.geo)) ? true : false;
        }

        /**
         * chect specific date data is exist
         * 
         * @return {Boolean}
         */
        function hasSpecificDateData() {
            return (!utils.isNull(model.apiData.areaSpecificDate) && !utils.isNull(model.apiData.geoSpecificDate)) ? true : false;
        }

        //#endregion

    }
})();