(function () {
    'use strict';

    var directiveID = 'testDirectives';
    angular
        .module('app')
        .directive(directiveID, showErrorsClass);

    showErrorsClass.$inject = ['utils', 'showErrorsConfig', '$compile', 'MESSAGE'];
    function showErrorsClass(utils, showErrorsConfig, $compile, MESSAGE) {
        var getShowSuccess, linkFunc, getOutputElement;

        getShowSuccess = function (options) {
            var showSuccess = showErrorsConfig.showSuccess;
            if (options && options.showSuccess != null) {
                showSuccess = options.showSuccess;
            }
            return showSuccess;
        };

        getOutputElement = function (formName, inputName, condition, message, moreParamExample) {
            return "<p id=\"" + formName + "-" + inputName + "-" + condition +"\"" + "ng-show=\"" + formName + " ." + inputName + ".$error." + condition
                + "\">" + message + (typeof(moreParamExample) != "undefined" ? moreParamExample : "") + "</p>";
        };

        linkFunc = function (scope, el, attrs, formCtrl) {
            var toggleClasses;
            var options = scope.$eval(attrs.testDirectives);
            var showSuccess = getShowSuccess(options);
            // find the text box element, which has the 'name' attribute
            var inputEl = el[0].querySelector("[name]");
            
            // convert the native text box element to an angular element
            var inputNgEl = angular.element(inputEl);
            // get the name on the text box so we know the property to check on the form controller
            var inputName = inputNgEl.attr('name');

            var attrs = angular.element(el[0].querySelector("input"))[0].attributes;
            
            
            if (!inputName) {
                throw 'show-errors element has no child input elements with a \'name\' attribute';
            }

            // only apply the 'has-error' class after the user leaves the text box
            inputNgEl.bind('blur', function () {
                var a = angular.element(this)[0].attributes;
                angular.forEach(a, function (obj, index) {
                    var message;
                    var id = '';
                    switch (obj.name) {
                        case 'required':
                            message = getOutputElement(formCtrl.$name, inputName, obj.name, MESSAGE.REQUIRED);
                            id = formCtrl.$name + "-" + inputName + "-" + obj.name;
                            break;
                        case 'type':
                            if (obj.value == 'email') {
                                message = getOutputElement(formCtrl.$name, inputName, obj.value, MESSAGE.EMAIL);
                                id = formCtrl.$name + "-" + inputName + "-" + obj.value;
                            }
                            if (obj.value == 'url') {
                                message = getOutputElement(formCtrl.$name, inputName, obj.value, MESSAGE.URL);
                                id = formCtrl.$name + "-" + inputName + "-" + obj.value;
                            }

                            if (obj.value == 'tel') {
                                message = getOutputElement(formCtrl.$name, inputName, obj.value, MESSAGE.TEL);
                                id = formCtrl.$name + "-" + inputName + "-" + obj.value;
                            }

                            break;
                        case 'ng-minlength':
                            message = getOutputElement(formCtrl.$name, inputName, obj.name.substring(3), MESSAGE.MIN_LENGTH, obj.value);
                            id = formCtrl.$name + "-" + inputName + "-" + obj.name.substring(3);
                            break;
                        case 'ng-maxlength':
                            message = getOutputElement(formCtrl.$name, inputName, obj.name.substring(3), MESSAGE.MAX_LENGTH, obj.value);
                            id = formCtrl.$name + "-" + inputName + "-" + obj.name.substring(3);
                            break;
                        case 'ng-pattern':
                            message = getOutputElement(formCtrl.$name, inputName, obj.name.substring(3), MESSAGE.BLACK_KEY);
                            id = formCtrl.$name + "-" + inputName + "-" + obj.name.substring(3);
                            break;
                    }
                    var messEl = $compile(message)(scope);
                    
                    
                    //var exist = el[0].querySelector("#" + id + "").length;
                    
                    //if (!angular.element(el[0].querySelector('#' + id))) {
                        el.append(messEl);
                    //}
                });

                //return toggleClasses(formCtrl[inputName].$invalid);
            });

            return toggleClasses = function (invalid) {
                el.toggleClass('has-error', invalid);
                if (showSuccess) {
                    return el.toggleClass('has-success', !invalid);
                }
            };

        };

        return {
            restrict: 'A',
            require: '^form',
            compile: function (elem, attrs) {
                return linkFunc;
            }
        };
    };

    // define provider here: need move other place
    angular
        .module('app')
        .provider('showErrorsConfig', function () {
            var _showSuccess = false;
            this.showSuccess = function (showSuccess) {
                return _showSuccess = showSuccess;
            };
            this.$get = function () {
                return {
                    showSuccess: _showSuccess
                }
            };
        });

    // define constance here: need move other place
    angular
        .module('app')
        .constant('MESSAGE', {

            'BLACK_KEY': 'This name contain black-list words.',
            
            'EMAIL': 'This is not a valid email',

            'URL': 'This is not a valid url',

            'TEL': 'This is not a valid tel number',
            
            'MAX_LENGTH': 'Max length is : ',

            'MIN_LENGTH': 'Min length is : ',

            'REQUIRED': 'This filed is required'

        });
})();