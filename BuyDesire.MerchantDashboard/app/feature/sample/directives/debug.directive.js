(function () {
    'use strict';

    var directiveID = 'debug';
    angular
        .module('app')
        .directive(directiveID, debug);

    debug.$inject = ['utils'];
    function debug(utils) {
        return {
            restrict: 'EA',
            scope: {
                name: '@',
                type: '=',
                value: '='
            },
            templateUrl: function () {
                return utils.viewPath('shared/directives', 'debug.directive');
            }
        };
    }
})();