(function () {
    'use strict';

    var moduleID = 'locationService';
    angular
        .module('app')
        .factory(moduleID, locationService);

    locationService.$inject = ['$q', 'config', 'baseService', 'currentUser'];
    function locationService($q, config, baseService, currentUser) {
        //#region exports
        return {
            importLocation: importLocation,
            getImportLocationStatus: getImportLocationStatus
        };
        //#endregion

        //#region private

        function importLocation(file) {
            return baseService.postWithFile(
                    config.api.importLocation,
                    { RetailerID: currentUser.RetailerID },
                    file
                ).then(function (data) {
                    return data;
                });
        }

        function getImportLocationStatus(sessionID) {
            return baseService.get(
                    config.api.getImportLocationStatus + sessionID, {}
                ).then(function (data) {
                    return data;
                });
        }
        //#endregion
    }
})();