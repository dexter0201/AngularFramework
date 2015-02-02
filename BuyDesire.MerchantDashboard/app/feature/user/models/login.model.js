(function () {
    'use strict';

    var modelID = 'loginModel';
    angular
        .module('app')
        .factory(modelID, loginModel);

    loginModel.$inject = ['_', 'baseModel', 'config'];
    function loginModel(_, baseModel, config) {
        //#region exports

        //properties
        var shared = {
            UserName: null,
            Password: null,
            Remember: true
        }

        //methods
        _.extend(shared, {
            validator: validator
        });
        return shared;
        //#endregion

        //#region private
        function validator() {
            var messages = config.validate.login;
            return {
                UserName: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.UserName_require] }
                    ]);
                },
                Password: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.Password_require] }
                    ]);
                }
            }
        }
        //#endregion
    }
})();