//(function () {
//    'use strict';

//    var directiveId = 'validationRule';

//    angular
//        .module('app')
//        .directive(directiveID, validationRule);

//    console.log(validationRule);
//    validationRule.$inject = ['$compile'];

//    function validationRule($compile) {
//        var CreateDivError = function (scope, ele, attrs, ctrl) {
//            var message = attrs.ngMessage;
//            console.log(message, attrs.ngMessage);
            
//            for (var i = 0; i < input[0].attributes.length; i++) {
//                console.log(input[0].attributes[i].name);
//                var mess = $compile(GetError(formName, inputName, removeNg(input[0].attributes[i].name), input[0].attributes[i].value, getMessage(inputName, removeNg(input[0].attributes[i].name))))(scope);
//                ele.append(mess);
//            };
//            ele.append($compile('<span style="color:green" ng-show="!' + formName + '.' + inputName + '.$invalid" >&#10004; Ok </span>')(scope));
//        }

//        return {
//            restrict: 'EA',
//            require: '^ngModel',
//            compile: function (ele, attrs) {
//                return CreateDivError;
//            }
//        };
//    }
//})()