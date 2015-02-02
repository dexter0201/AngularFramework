(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfigurator);

    routeConfigurator.$inject = ['$routeProvider', 'config', '$locationProvider'];
    function routeConfigurator($routeProvider, config, $locationProvider) {
        getRoutes().forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: config.route._404 });
        //$locationProvider.html5Mode(true).hashPrefix('!');

        function getRoutes() {
            return [
                {
                    url: '/',
                    config: {
                        templateUrl: config.route.defaultPath
                    }
                },
                {
                    url: '/:controller/:action/:id',
                    config: {
                        templateUrl: function (e) {
                            return window._.template(config.route.viewPathTemplate)(e);
                        }
                    }
                },
                {
                    url: '/:controller/:action',
                    config: {
                        templateUrl: function (e) {
                            return window._.template(config.route.viewPathTemplate)(e);
                        }
                    }
                },
                {
                    url: '/:controller',
                    config: {
                        templateUrl: function (e) {
                            return window._.template(config.route.viewPathTemplate)({ controller: e.controller, action: e.controller });
                        }
                    }
                }
            ];
        }
    }
})();