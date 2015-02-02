(function () {
    'use strict';

    var modelID = 'homeModel';
    angular
        .module('app')
        .factory(modelID, homeModel);

    homeModel.$inject = ['_', 'baseModel', 'config'];
    function homeModel(_, baseModel, config) {
        //#region exports

        //properties
        var snapshot;
        var shared = {
            data: null,//getRetailerInfoResponseDTO.Result
            countries: null,
            paymentMethods: null,
            currencies: null
        }

        //methods
        _.extend(shared, {
            isCompleted: isCompleted,
            isCompletedStep: isCompletedStep,
            getCompletedStep: getCompletedStep,
            backupData: backupData,
            restoreData: restoreData,
            validator: validator
        });
        return shared;
        //#endregion

        //#region private
        function isCompleted(index) {
            return isCompletedStep(index) ? 'completed' : '';
        }
        function isCompletedStep(index) {
            return getFlags()[index] ? true : false;
        }
        function getCompletedStep() {
            return _.compact(getFlags()).length;
        }
        function getFlags() {
            return !shared.data ? [] : [shared.data.IsBrandDetailsSetup,
                            shared.data.IsContactDetailsSetup,
                            shared.data.IsStoreAppearanceSetup,
                            shared.data.IsPaymentInformationSetup];
        }

        function backupData() {
            snapshot = _.clone(shared.data);
        }
        function restoreData() {
            shared.data = _.clone(snapshot);
        }
        //#endregion

        //#region validator
        function validator() {
            var messages = config.validate.home;
            return {
                StorefrontDomain: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.StorefrontDomain_require] },
                        { minLength: [value, 3, messages.StorefrontDomain_minLength] },
                        { maxLength: [value, 50, messages.StorefrontDomain_minLength] },
                        { subDomain: [value, messages.StorefrontDomain_invalid] }
                    ]);
                },

                Tagline: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.Tagline_require] },
                        { maxLength: [value, 256, messages.Tagline_maxLength] }
                    ]);
                },

                Description: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.Description_require] },
                        { maxLength: [value, 512, messages.Description_maxLength] }
                    ]);
                },

                EmailAddress: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.EmailAddress_require] },
                        { email: [value, messages.EmailAddress_invalid] }
                    ]);
                },

                WebsiteURL: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.WebsiteURL_require] },
                        { url: [value, messages.WebsiteURL_invalid] }
                    ]);
                },

                PhoneNumber: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.PhoneNumber_require] },
                        { phoneNumber: [value, messages.PhoneNumber_invalid] }
                    ]);
                },

                Address1: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.Address1_require] }
                    ]);
                },

                Address2: function (value) {

                },

                City: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.City_require] }
                    ]);
                },

                StateName: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.StateName_require] }
                    ]);
                },

                PostCode: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.PostCode_require] }
                    ]);
                },

                CountryID: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.CountryID_require] }
                    ]);
                },

                PreferredStoreThemeID: function (value) {

                },

                PreferredPaymentMethodID: function (value) {

                },

                PayPalEmailAddress: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.EmailAddress_require] },
                        { email: [value, messages.EmailAddress_invalid] }
                    ]);
                }
            }
        }
        //#endregion
    }
})();