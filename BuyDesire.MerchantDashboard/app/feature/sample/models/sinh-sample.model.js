(function () {
    'use strict';

    var modelID = 'sinhSampleModel';
    angular
        .module('app')
        .factory(modelID, sinhSampleModel);

    sinhSampleModel.$inject = ['_', 'baseModel', 'config'];
    function sinhSampleModel(_, baseModel, config) {
        var shared = {
            //enum
            time: {
                daily: 0,
                weekly: 1,
                monthly: 2,
                specificDates: 3
            },
            type: {
                views: 0,
                tags: 1,
                desires: 2,
                orders: 3,
                sales: 4
            },
            chart: {
                area: 0,
                geo: 1
            },

            selectedChart: 0,
            selectedTime: 0,
            selectedType: 0,
            data: null,
            chartSetting: null
        }

        _.extend(shared, {
        });
        return shared;


    }
})();