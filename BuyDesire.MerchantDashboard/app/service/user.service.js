(function () {
    'use strict';

    var moduleID = 'userService';
    angular
        .module('app')
        .factory(moduleID, userService);

    userService.$inject = ['$q', 'config', 'userModel', 'baseService', '_', 'loginRequestDTO', 'registerRequestDTO', 'forgotRequestDTO'];
    function userService($q, config, userModel, baseService, _, loginRequestDTO, registerRequestDTO, forgotRequestDTO) {
        //#region exports
        return {
            login: login,
            register: register,
            forgotPassword: forgotPassword
        };
        //#endregion

        //#region private
        function login(loginModel) {
            return baseService.post(
                    config.api.login,
                    new loginRequestDTO(loginModel)
                ).then(function (data) {
                    return data;
                });
        }

        function register(registerModel) {
            return baseService.post(
                    config.api.register,
                    new registerRequestDTO(registerModel)
                ).then(function (data) {
                    return data;
                });
        }

        function forgotPassword(forgotPasswordModel) {
            return baseService.post(
                    config.api.forgotPassword,
                    new forgotRequestDTO(forgotPasswordModel)
                ).then(function (data) {
                    return data;
                });
        }
        //#endregion
    }
})();