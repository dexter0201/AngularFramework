(function () {
    'use strict';

    var directiveID = 'userProfile';
    angular
        .module('app')
        .directive(directiveID, userProfile);

    userProfile.$inject = ['utils'];
    function userProfile(utils) {
        return {
            restrict: 'EA',
            scope: {
                source: '=',
                onClick: '&'
            },
            templateUrl: function () {
                return utils.viewPath('shared/directives', 'user-profile.directive');
            }
        };
    }
})();