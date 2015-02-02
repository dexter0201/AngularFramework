(function () {
    'use strict';

    var directiveID = 'validateSummary';
    angular
        .module('app')
        .directive(directiveID, validateSummary);
    validateSummary.$inject = ['utils','$compile'];


    function validateSummary(utils,$compile) {
        function GetError(formName, eleName, errName, value, message) {
            if (errName === 'type')
                errName = value;
            return '<span style="color:red" ng-show="' + formName + '.' + eleName + '.$error.' + errName + '" >&#10008; ' + message +'</p>';
        }
        function removeNg(errName) {
            return errName.replace('ng-', '');
        }

        function getMessage(eleName,attrName) {
            switch (attrName) {
                case 'required':
                    return 'Tell us your ' + eleName;
                    break;
                case 'minlength': case 'maxlength':
                    return 'This ' + eleName + ' must be in range';
                    break;
                case 'pattern':case 'type':
                    return 'Your ' + eleName + ' is invalid';
                    break;      
                case 'existed-validate':
                    return 'This ' + eleName + ' is existed';
                    break;

            }
        }

        var CreateDivError = function (scope, ele, attrs, ctrl) {
            
            var input = ele.find('input');
            var formName = ele.parents('form').attr('name');
            var inputName = input.attr('name');
            for (var i = 0; i < input[0].attributes.length; i++) {
                console.log(input[0].attributes[i].name);
                var mess = $compile(GetError(formName, inputName, removeNg(input[0].attributes[i].name), input[0].attributes[i].value, getMessage(inputName, removeNg(input[0].attributes[i].name))))(scope);
                ele.append(mess);
            };
            ele.append($compile('<span style="color:green" ng-show="!' + formName + '.' + inputName + '.$invalid" >&#10004; Ok </span>')(scope));
        }
        return {
            restrict: 'EA',     
            compile: function (ele, attrs) {
                return CreateDivError;
            }
    };
}
})();