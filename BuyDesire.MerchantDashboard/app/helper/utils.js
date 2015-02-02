(function () {
    'use strict';

    angular
        .module('app')
        .factory('utils', utils);

    utils.$inject = ['$controller', '_', 'config'];
    function utils($controller, _, config) {

        //#region exports
        /**************************************************************************************************
         * <summary>    Interface. </summary>
         **************************************************************************************************/
        var service = {
            //object helper
            isNull: isNull,
            pick: pick,

            //string helper
            trim: trim,

            //validation helper
            isNumber: isNumber,
            isValidEmail: isValidEmail,
            isValidUsername: isValidUsername,
            isValidSubDomain: isValidSubDomain,
            isSpaceSubDomain: isSpaceSubDomain,
            isValidPhoneNumber: isValidPhoneNumber,
            isValidURL: isValidURL,

            //loging helper
            showError: showError,
            showWarning: showWarning,
            showSuccess: showSuccess,
            showInfo: showInfo,
            log: log,

            //others
            inheritance: inheritance,
            viewPath: viewPath,
            routePath: routePath,
            checkUploadImage: checkUploadImage,
            background: background,
            isSuccessResponseDTO: isSuccessResponseDTO,
            getFirstErrorMessage: getFirstErrorMessage,
            requireAuthorized: requireAuthorized
        };
        return service;
        //#endregion

        //#region object helper
        function isNull(value) {
            return typeof value == 'undefined' || value == 'undefined' || value == null || trim(value.toString()) == '';
        };
        function pick(data, defaults) {
            var keys = _.keys(defaults);
            return _.pick(data, function (value, key, object) {
                return _.indexOf(keys, key) > -1;
            });
        }
        //#endregion

        //#region string helper
        function trim(value) {
            if (typeof value == 'undefined' || value == null)
                return '';
            return value.replace(/^\s+|\s+Utils/g, "");
        };

        //#endregion

        //#region validation helper
        function isNumber(val) {
            if (val != null && val.length != '') {
                return /^[-]?\d+$/.test(val);
            }
            return true;
        }
        /**
         * Checking the email is valid
         */
        function isValidEmail(email) {
            var emailRex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return rexTest(emailRex, email);
        };

        function rexTest(rex, value) {
            return rex.test(value);
        }

        /**
         * Checking the username is valid
         */
        function isValidUsername(username) {
            return /^\w+([\.-]?\w+)*$/.test(username);
        };

        /**
         * Checking the tel number is valid
         */
        function isValidPhoneNumber(tel) {
            return /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/.test(tel);
        };

        /**
         * Checking the url is valid
         */
        function isValidURL(url) {
            return /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(url);
        };

        /**
         * Checking the sub-domain is valid
         */
        function isValidSubDomain(subdomain) {
            return /^[a-zA-Z]+[a-zA-Z0-9\-]*$/.test(subdomain);
        };

        function isNullOrEmpty(val) {
            return /^[-]?\d+$/.test(val);
        }

        function isSpaceSubDomain(subdomain) {
            return subdomain.match(' ') ? false : true;
        };
        //#endregion

        //#region logging helper
        function showError(message) {
            toastr.error(message);
        }

        function showWarning(message) {
            toastr.warning(message);
        }

        function showSuccess(message) {
            toastr.success(message);
        }

        function showInfo(message) {
            toastr.info(message);
        }
        function log(message) {
            console.log(message);
        }
        //#endregion

        //#region others
        function inheritance(baseController, $scope) {
            $controller(baseController, { $scope: $scope });
        }

        function viewPath(feature, name) {
            return _.template(config.route.viewPathTemplate)({ controller: feature, action: name });
        }

        function routePath(feature, name) {
            return _.template(config.route.path)({ controller: feature, action: name });
        }

        function checkUploadImage(imageFile) {
            // 5MB = 5242880 = 5 * 1024 * 1024
            if ((imageFile.type === "image/jpg" || imageFile.type === "image/jpeg" || imageFile.type === "image/png") && imageFile.size <= 5242880) {
                return true;
            }

            return false;
        }

        function isSuccessResponseDTO(responseDTO) {
            return responseDTO.StatusCode === 100
                    || responseDTO.StatusCode === 101
                    || isNull(responseDTO.StatusCode);
        }

        function getFirstErrorMessage(response) {
            var values = _.values(response.Messages);
            return values.length > 0 ? values[0] : '';
        }

        function requireAuthorized(next) {
            var controller = next.params.controller;
            if (controller == 'user' || controller == 'content')
                return false;
            return true;
        }

        function background(callBack) {
            _.defer(callBack);
        }

        //#endregion
    }
})();