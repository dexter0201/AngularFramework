(function () {
    'use strict';

    var modelID = 'registerModel';
    angular
        .module('app')
        .factory(modelID, registerModel);

    registerModel.$inject = ['_', 'baseModel', 'config'];
    function registerModel(_, baseModel, config) {
        //#region exports

        //properties
        var shared = {
            UserName: null,
            Email: null,
            Password: null,
            ConfirmPassword: null,
            StoreName: null,
            FullName: null,
            Adderss1: null,
            Address2: null,
            City: null,
            PostCode: null,
            StateName: null,
            CountryID: 1,
            PhoneNumber: null
        }

        //methods
        _.extend(shared, {
            validator: validator,
            setNull: setNull
        });
        return shared;
        //#endregion

        //#region private
        function setNull() {
            _.each(shared, function(value, index) {
                if (index !== 'setNull') {
                    shared[index] = index === 'CountryID' ? 1 : null;
                }
            });
        }
        
        function validator() {
            var messages = config.validate.register;
            return {
                UserName: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.UserName_require] },
                        { userName: [value, messages.UserName_invalid] },
                        { minLength: [value, 6, messages.UserName_minLength] },
                    ]);
                },
                Email: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.Email_require] },
                        { email: [value, messages.Email_invalid] }
                    ]);
                },
                Password: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.Password_require] },
                        { minLength: [value, 6, messages.Password_minLength] }
                    ]);
                },
                ConfirmPassword: function (value, password) {
                    return baseModel.validate([
                        { require: [value, messages.ConfirmPassword_require] },
                        { equal: [value, password, messages.ConfirmPassword_notMatch] }
                    ]);
                },
                StoreName: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.StoreName_require] },
                        { minLength: [value, 6, messages.StoreName_minLength] }
                    ]);
                },

                FullName: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.FullName_require] }
                    ]);
                },

                Adderss1: function (value) {

                },

                Address2: function (value) {

                },

                City: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.City_require] }
                    ]);
                },

                StateName: function (value) {

                },

                PostCode: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.PostCode_require] }
                    ]);
                },

                CountryID: function (value) {

                },

                PhoneNumber: function (value) {

                }
            }
        }
        //#endregion
    }
})();