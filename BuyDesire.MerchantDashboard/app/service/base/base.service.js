(function () {
    'use strict';

    angular
        .module('app')
        .factory('baseService', baseService);

    baseService.$inject = ['$q', 'config', 'utils', '_', '$http', '$upload'];
    function baseService($q, config, utils, _, $http, $upload) {
        //#region exports
        return {
            get: get,
            post: post,
            postWithFile: postWithFile
        };
        //#endregion

        //#region private
        function get(url, params) {
            var requestURL = _.template('{baseUrl}{prefix}{url}')({
                baseUrl: config.api.baseUrl,
                prefix: config.api.prefix,
                url: url
            });
            return $http({
                url: requestURL,
                method: "GET",
                params: params
            }).then(function (response) {
                return response.data;
            });
        }

        function post(url, params) {
            var requestURL = _.template('{baseUrl}{prefix}{url}')({
                baseUrl: config.api.baseUrl,
                prefix: config.api.prefix,
                url: url
            });
            return $http({
                url: requestURL,
                method: "POST",
                data: $.param(params),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            }).then(function (response) {
                return response.data;
            }, function (response) {
                utils.showError(JSON.stringify(_.flatten(_.values(response.data.ModelState)).join(',').replace("\"", "")));
                return response.data;
            });
        }

        function postWithFile(url, params, file) {
            var requestURL = _.template('{baseUrl}{prefix}{url}')({
                baseUrl: config.api.baseUrl,
                prefix: config.api.prefix,
                url: url
            });
            var deferred = $q.defer();
            $upload.upload({
                url: requestURL,
                method: "POST",
                data: { request: params },
                file: file
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(data);
            });
            return deferred.promise;
        }
        //#endregion
    }
})();