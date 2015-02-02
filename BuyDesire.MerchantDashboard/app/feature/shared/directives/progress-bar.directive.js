(function () {
    'use strict';

    /** <usage>
            <bd-progress-bar data-value="vm.progressValue" data-hasError="vm.showError"></bd-progress-bar>
        </usage> */

    var directiveID = 'bdProgressBar';
    angular
        .module('app')
        .directive(directiveID, bdProgressBar);

    bdProgressBar.$inject = ['utils'];
    function bdProgressBar(utils) {
        return {
            restrict: 'EA',
            scope: {
                value: '=',
                failurePercent: '='
            },
            templateUrl: function () {
                return utils.viewPath('shared/directives', 'progress-bar.directive');
            },
            link: function (scope, element, attrs) {
                scope.$watch('value', function (newVal, oldVal) {
                    if (newVal > 0) {
                        angular.element(angular.element(element.children()[0]).children()[0]).animate({
                            width: scope.value + '%'
                        }, 1000);
                    }
                });
                scope.$watch('failurePercent', function (newVal, oldVal) {
                    if (newVal > 0) {
                        angular.element(angular.element(element.children()[0]).children()[1]).animate({
                            width: scope.failurePercent + '%'
                        }, 1000);
                    }
                });
            }
        };
    }
})();