(function () {
    'use strict';
    /** <usage>
            <form angular-validator-submit="" name="form" novalidate angular-validator...
                <input type="text"
                               name="SomeName"
                               ng-model="vm.model.data.SomeName"
                               validate-on="dirty"
                               validator="vm.model.validator().SomeName(vm.model.data.SomeName) === true"
                               invalid-message="vm.model.validator().SomeName(vm.model.data.SomeName)">
        </usage> */

    /** It's not good enough, need to be improved*/

    angular
        .module('app')
        .directive('angularValidator', angularValidator);

    angularValidator.$inject = [];
    function angularValidator() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, fn) {
                var DOMForm = angular.element(element)[0];
                var scopeForm = scope[DOMForm.name];
                scopeForm.submitted = false;
                element.on('submit', function (event) {
                    event.preventDefault();
                    scope.$apply(function () {
                        scopeForm.submitted = true;
                    });
                    if (scopeForm.$valid) {
                        scope.$apply(function () {
                            scope.$eval(DOMForm.attributes["angular-validator-submit"].value);
                        });
                    }
                });
                setupWatches(DOMForm);
                function setupWatches(formElement) {
                    for (var i = 0; i < formElement.length; i++) {
                        if (i in formElement) {
                            setupWatch(formElement[i]);
                        }
                    }
                }
                function setupWatch(elementToWatch) {
                    var isBlur = "validate-on" in elementToWatch.attributes && elementToWatch.attributes["validate-on"].value === "blur";
                    if (isBlur) {
                        angular.element(elementToWatch).on('blur', function () {
                            updateValidationMessage(elementToWatch);
                            updateValidationClass(elementToWatch);
                        });
                    }
                    scope.$watch(function () {
                        return elementToWatch.value + scopeForm.submitted + checkElementValididty(elementToWatch) + getDirtyValue(scopeForm[elementToWatch.name]);
                    }, function () {
                        if ("validate-on" in elementToWatch.attributes && elementToWatch.attributes["validate-on"].value === "dirty") {
                            updateValidationMessage(elementToWatch);
                            updateValidationClass(elementToWatch);
                        }
                        else if (scopeForm.submitted || (scopeForm[elementToWatch.name] && scopeForm[elementToWatch.name].$valid)) {
                            updateValidationMessage(elementToWatch);
                            updateValidationClass(elementToWatch);
                        }
                    });
                }
                function getDirtyValue(element) {
                    if (element) {
                        if ("$dirty" in element) {
                            return element.$dirty;
                        }
                    }
                }
                function checkElementValididty(element) {
                    if ("validator" in element.attributes) {
                        var isElementValid = scope.$eval(element.attributes.validator.value);
                        scopeForm[element.name].$setValidity("angularValidator", isElementValid);
                        return isElementValid;
                    }
                }
                function updateValidationMessage(element) {
                    if (!(element.name in scopeForm)) {
                        return;
                    }
                    var scopeElementModel = scopeForm[element.name];
                    if (scopeElementModel.$dirty || scope[element.form.name].submitted) {
                        var validationMessageElement = isValidationMessagePresent(element);
                        if (validationMessageElement) {
                            validationMessageElement.remove();
                        }
                        if (scopeElementModel.$error.required) {
                            if ("required-message" in element.attributes) {
                                //angular.element(element).after(generateErrorMessage(element.attributes['required-message'].value));
                                angular.element(element).parent().after(generateErrorMessage(element.attributes['required-message'].value));
                            }
                        } else if (!scopeElementModel.$valid) {
                            if ("invalid-message" in element.attributes) {
                                //angular.element(element).after(generateErrorMessage(element.attributes['invalid-message'].value));
                                angular.element(element).parent().after(generateErrorMessage(element.attributes['invalid-message'].value));
                            }
                        }
                    }
                }
                function generateErrorMessage(messageText) {
                    //return "<label class='control-label has-error validationMessage'>" + scope.$eval(messageText) + "</label>";
                    return "<div class='error validationMessage'>" + scope.$eval(messageText) + "</div>";
                }
                function isValidationMessagePresent(element) {
                    //var elementSiblings = angular.element(element).parent().children();
                    var elementSiblings = angular.element(element).parent().parent().children();
                    for (var i = 0; i < elementSiblings.length; i++) {
                        if (angular.element(elementSiblings[i]).hasClass("validationMessage")) {
                            return angular.element(elementSiblings[i]);
                        }
                    }
                    return false;
                }
                function updateValidationClass(element) {
                    if (!(element.name in scopeForm)) {
                        return;
                    }
                    var formField = scopeForm[element.name];
                    if (formField.$dirty || scope[element.form.name].submitted) {
                        if (formField.$valid) {
                            angular.element(element.parentNode).removeClass('has-error');
                            angular.element(element).removeClass('has-error');
                        } else if (formField.$invalid) {
                            angular.element(element.parentNode).addClass('has-error');
                            angular.element(element).addClass('has-error');
                        }
                    }
                }
            }
        };
    };
})();