(function () {
    'use strict';

    angular
        .module('app')
        .factory('appHelper', appHelper);

    appHelper.$inject = ['_', 'config', 'dashboardModel', 'currentUser', 'utils', 'authHelper', '$location'];
    function appHelper(_, config, dashboardModel, currentUser, utils, authHelper, $location) {
        //#region exports
        return {
            preloadNecessaryData: preloadNecessaryData
        };
        //#endregion

        //#region private
        function preloadNecessaryData() {
            preloadDashboardData();
        }

        function preloadDashboardData() {
            if (authHelper.isLoggedIn() && $location.url().indexOf('dashboard') < 0) {
                dashboardModel.preLoadData();
            }
        }
        //#endregion
    }
})();