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
                            angular.element(formElement[i]).hasClass('form-control') || formElement[i].nodeName === 'BUTTON'
                                || formElement[i].type === 'checkbox' ? void (0) : angular.element(formElement[i]).addClass('form-control');
                            setupWatch(formElement[i]);
                        }
                    }
                }
                function setupWatch(elementToWatch) {
                    var isBlur = "validate-on" in elementToWatch.attributes && elementToWatch.attributes["validate-on"].value === "blur";
                    if (isBlur) {
                        angular.element(elementToWatch).on('blur', function () {
                            updateValidationMessage(elementToWatch);
                        });
                    }
                    scope.$watch(function () {
                        return elementToWatch.value + scopeForm.submitted + checkElementValididty(elementToWatch) + getDirtyValue(scopeForm[elementToWatch.name]);
                    }, function () {
                        if ("validate-on" in elementToWatch.attributes && elementToWatch.attributes["validate-on"].value === "dirty") {
                            updateValidationMessage(elementToWatch);
                        }
                        else if (scopeForm.submitted || (scopeForm[elementToWatch.name] && scopeForm[elementToWatch.name].$valid)) {
                            updateValidationMessage(elementToWatch);
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
                        //console.log(isElementValid);
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
                        if (scopeElementModel.$valid) {
                            angular.element(element).removeClass('has-error').tooltip('destroy');
                        } else {
                            if ("invalid-message" in element.attributes) {
                                angular.element(element).addClass('has-error').tooltip('destroy').tooltip({ placement: 'top', title: scope.$eval(element.attributes['invalid-message'].value) }).tooltip('show');
                            }
                        }
                    }
                }
            }
        };
    };
})();