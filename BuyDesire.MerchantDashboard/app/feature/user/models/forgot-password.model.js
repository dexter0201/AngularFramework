(function () {
    'use strict';

    var modelID = 'forgotPasswordModel';
    angular
        .module('app')
        .factory(modelID, forgotPasswordModel);

    forgotPasswordModel.$inject = ['_', 'baseModel', 'config'];
    function forgotPasswordModel(_, baseModel, config) {
        //#region exports

        //properties
        var shared = {
            UserName: null,
            Email: null,
            isSuccess: null
        }

        //methods
        _.extend(shared, {
            validator: validator,
            setNull: setNull
        });
        return shared;
        //#endregion

        //#region private
        
        function setNull () {
            _.each(shared, function (value, index) {
                if (index !== 'setNull') {
                    shared[index] = null;
                }
            });
        }

        function validator() {
            var messages = config.validate.forgot_password;
            return {
                UserName: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.UserName_require] },
                        { userName: [value, messages.UserName_invalid] }
                    ]);
                },
                Email: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.Email_require] },
                        { email: [value, messages.Email_invalid] }
                    ]);
                }
            }
        }
        //#endregion
    }
})();