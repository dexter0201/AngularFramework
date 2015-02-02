(function () {
    'use strict';

    var directiveID = 'existedValidate';
    angular
        .module('app')
        .directive(directiveID, existedValidate);
    function existedValidate() {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (viewValue === 'Tran Quoc Tam') {
                        ctrl.$setValidity('existed', false);
                    }
                    else {
                        ctrl.$setValidity('existed', true);
                    }
                    
                    //if (viewValue === 'Tran Quoc Tam') {                        
                    //    ctrl.$setValidity('existed', false);
                    //}
                    //else {
                    //    ctrl.$setValidity('existed', true);          
                    //}
                    return viewValue;
                });
            }
        }
    }
})();