(function () {
    'use strict';

    // directive for simple jQuery date picker
    var directiveID = 'myDatePicker';
    angular
        .module('app')
        .directive(directiveID, DatePicker);

    DatePicker.$inject = ['$parse'];
    function DatePicker($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                $(function () {
                    console.log($(element).datepicker);
                    $(element).datepicker({
                        dateFormat: 'dd/mm/yy',
                        onSelect: function (date) {
                            scope.$apply(function () {
                                ngModelCtrl.$setViewValue(date);
                            });
                        }
                    });
                });
            }
        }
    };

})();