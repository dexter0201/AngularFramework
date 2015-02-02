(function () {
    'use strict';

    angular
        .module('app')
        .factory('httpRequestInterceptor', httpRequestInterceptor)
        .config(providerConfig);

    //#region http
    httpRequestInterceptor.$inject = ['$q', '$location', 'config'];
    function httpRequestInterceptor($q, $location, config) {
        return {
            'responseError': function (rejection) {
                if (rejection.status === 404) {
                    $location.path(config.route._404);
                    return $q.reject(rejection);
                } else if (rejection.status === 400) {
                    return $q.reject(rejection);
                } else {
                    return $q.reject(rejection);
                }
            }
        };
    }
    //#endregion

    //#region config
    providerConfig.$inject = ['$provide', '$httpProvider'];
    function providerConfig($provide, $httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
        $provide.decorator('$exceptionHandler', exceptionHandler);
    }
    //#endregion

    //#region exception
    exceptionHandler.$inject = ['$injector', '$delegate', 'config'];
    function exceptionHandler($injector, $delegate, config) {
        return function (exception, cause) {
            var $location;
            $delegate(exception, cause);
            if (config.isDebug) {
                toastr.error('[ERROR] : ' + exception.message);
            } else {
                $location = $location || $injector.get('$location');
                $location.path('/content/error');
            }
        };
    }
    //#endregion    
})();