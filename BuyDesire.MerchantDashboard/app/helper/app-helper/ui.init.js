(function () {
    'use strict';

    angular
       .module('app')
        .run(['$rootScope', '$location', 'utils', function ($rootScope, $location, utils) {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if($location.url() == '/')
                    $rootScope.layout = utils.viewPath('shared/layout', 'layout-landing');
                else
                    $rootScope.layout = utils.viewPath('shared/layout', 'layout');
            });
        }]);
})();