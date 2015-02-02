(function () {
    'use strict';

    /** <usage>
            <a href="" data-bd-route data-controller="location" data-action="locations"></a>
            will return: href="/#/location/locations"
        </usage> */

    var directiveID = 'bdRoute';
    angular
        .module('app')
        .directive(directiveID, bdRoute);

    bdRoute.$inject = ['utils'];
    function bdRoute(utils) {
        return {
            restrict: 'EA',
            scope: {
                controller: '@',
                action: '@'
            },
            link: function (scope, elem, attrs, controller) {
                var el = elem[0];
                el.href = utils.routePath(scope.controller, scope.action);
            }
        };
    }
})();