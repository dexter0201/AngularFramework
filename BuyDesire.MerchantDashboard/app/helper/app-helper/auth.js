(function () {
    'use strict';

    angular
       .module('app')
       .run(['$rootScope', '$location', 'setting', 'authHelper', 'utils', 'config',
    function ($rootScope, $location, setting, authHelper, utils, config) {
        
        $rootScope.$on('$routeChangeStart', function (event, next) {
            var currentUser = authHelper.getCurrentUser();
            var authorised = currentUser != null;
            var requireAuthorized = utils.requireAuthorized(next);
            if (next && requireAuthorized && !authorised) {
                $location.path(config.route.login);
            }
            if (($location.url() == config.route.login || $location.url() == config.route.register) && authorised) {
                $location.path('/');
            }
        });
    }]);
})();