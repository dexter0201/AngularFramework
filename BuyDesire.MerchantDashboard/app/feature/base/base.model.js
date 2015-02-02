(function () {
    'use strict';

    var modelID = 'baseModel';
    angular
        .module('app')
        .factory(modelID, baseModel);

    baseModel.$inject = ['_', 'utils'];
    function baseModel(_, utils) {
        //#region private properties
        var validators = {
            require: require,
            minLength: minLength,
            maxLength: maxLength,
            email: email,
            userName:userName,
            url: url,
            phoneNumber: phoneNumber,
            equal: equal,
            number: number,
            subDomain: subDomain
        };
        //#endregion

        //#region exports
        return {
            validate: validate
        };
        //#endregion

        //#region validators
        /**************************************************************************************************
         * Note that every validators must to return
         *      true: if valid
         *      string message: if invalid
         **************************************************************************************************/

        function email(value, message) {
            if (value == null) {
                return true;
            }
            return !utils.isValidEmail(value) ? message : true;
        }

        function userName(value, message) {
            return !utils.isValidUsername(value) ? message : true;
        }
                
        function url(value, message) {
            return (!utils.isNull(value) && !utils.isValidURL(value)) ? message : true;
        }

        function phoneNumber(value, message) {
            return !utils.isValidPhoneNumber(value) ? message : true;
        }

        function require(value, message) {
            return utils.isNull(value) ? message : true;
        }

        function minLength(value, length, message) {
            return (!utils.isNull(value) && value.length < length) ? message : true;
        }

        function maxLength(value, length, message) {
            return (!utils.isNull(value) && value.length > length) ? message : true;
        }

        function equal(value1, value2, message) {
            return value1 === value2 ? true : message;
        }

        function number(value, message) {
            return utils.isNumber(value) ? true : message;
        }

        function subDomain(value, message) {
            return utils.isSpaceSubDomain(value) ? true : message;
        }
        //#endregion

        //#region validate
        /**************************************************************************************************
         * <summary>    Map given rules with private validators, return first invalid rule message. </summary>
         *
         * <remarks>    Sinh.tran, 10/17/2014. </remarks>
         *
         * <param name="rules"> Array of validation rules, each rule has:
         *                      key: is name of validate function, 
         *                      value:  is an array that contains parameters. </param>
         *
         * <returns>     true (if valid) || string message (if invalid)</returns>
         **************************************************************************************************/
        function validate(rules) {
            var result = true;
            _.each(rules, function (rule) {
                if (result == true) {
                    var _validator = validators[_.keys(rule)[0]];
                    if (_.isFunction(_validator)) {
                        result = _validator.apply(null, _.values(rule)[0]);
                        if (result != true)
                            return result;
                    }
                }
            });
            return result;
        }
        //#endregion
    }
})();