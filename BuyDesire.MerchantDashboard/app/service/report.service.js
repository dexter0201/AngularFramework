(function () {
    'use strict';

    var moduleID = 'reportService';
    angular
        .module('app')
        .factory(moduleID, reportService);

    reportService.$inject = ['$q', 'config', 'baseService', 'currentUser'];
    function reportService($q, config, baseService, currentUser) {
        //#region exports
        return {
            getReportByDate: getReportByDate,
            getReportByLocation: getReportByLocation
        };
        //#endregion

        //#region private
        function getReportByDate(startDate, endDate) {
            return baseService.get(
                    config.api.getReportByDate,
                    {
                        RetailerID: 1,//currentUser.RetailerID,//hardcode
                        StartDate: startDate || null,
                        EndDate: endDate || null
                    }
                ).then(function (data) {
                    return data;
                });
        }

        function getReportByLocation(startDate, endDate) {
            return baseService.get(
                    config.api.getReportByLocation,
                    {
                        RetailerID: 1,//currentUser.RetailerID,//hardcode
                        //StartDate: startDate || null,
                        //EndDate: endDate || null
                        StartDate: startDate || '11/01/2013',
                        EndDate: endDate || '01/01/2014'
                    }
                ).then(function (data) {
                    return data;
                });
        }
        //#endregion
    }
})();