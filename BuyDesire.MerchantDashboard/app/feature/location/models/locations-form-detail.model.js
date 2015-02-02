(function () {
    'use strict';

    var modelID = 'locationDetailModel';
    angular
        .module('app')
        .factory(modelID, locationDetailModel);

    locationDetailModel.$inject = ['_', 'baseModel', 'config', 'currentUser'];
    function locationDetailModel(_, baseModel, config, currentUser) {
        //#region exports
        //properties
        var shared = {
            data : null,
            countries: null,
            states: null,
            currencies: null,
            isEdit: false,

            RetailerStoreID: 0,
            RetailerID: currentUser.RetailerID,
            StoreCode: null,
            StoreName: null,
            AddressLine1: null,
            AddressLine2: null,
            City: null,
            StateID: 1,
            PostCode: null,
            CountryID: 1,
            PhoneNumber1: null,
            PhoneNumber2: null,
            MobileNumber: null,
            Fax: null,
            Website: null,
            EmailAddress: null,
            Hours: null,
            Description: null,
            Latitude: null,
            Longitude: null
        }

        //methods
        _.extend(shared, {
            setData: setData,
            validator: validator
        });
        return shared;
        //#endregion

        //#region private
        function setData(data) {
            var keys = _.keys(data);
            // console.log(keys);
            _.pick(keys, function (value, key, object) {
                // if (value !== 'setData' && value !== 'validator')
                shared[value] = data[value];
            });
            // console.log(data);
        }
        //#endregion
        
        //#region validator
        function validator() {
            var messages = config.validate.location;
            return {
                StoreCode: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.StoreCode_require] },
                        { maxLength: [value, messages.StoreCode_maxLength] }
                    ]);
                },

                StoreName: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.StoreName_require] },
                        { maxLength: [value, messages.StoreName_maxLength] }
                    ]);
                },

                AddressLine1: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.AddressLine1_require] },
                        { maxLength: [value, 500, messages.AddressLine1_maxLength] }
                    ]);
                },

                AddressLine2: function (value) {
                    return baseModel.validate([
                        { maxLength: [value, 500, messages.AddressLine2_maxLength] }
                    ]);
                },

                //StateName: function (value) {
                //    return baseModel.validate([
                //        { number: [value, ""] }
                //    ]);
                //},

                City: function (value){
                    return baseModel.validate([
                            { require: [value, messages.City_require] },
                            { maxLength: [value, 50, messages.City_maxLength] }
                    ]);
                },

                PostCode: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.PostCode_require] },
                        { number: [value, messages.PostCode_number] },
                        { maxLength: [value, 50, messages.PostCode_maxLength] }
                    ]);
                },

                PhoneNumber1: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.PhoneNumber1_require] },
                        { number: [value, messages.PhoneNumber_number] },
                        { minLength: [value, 10, messages.PhoneNumber_minLength] },
                        { maxLength: [value, 50, messages.PhoneNumber_maxLength] }
                    ]);
                },

                PhoneNumber2: function (value) {
                    return baseModel.validate([
                        { number: [value, messages.PhoneNumber_number] },
                        { maxLength: [value, 50, messages.PhoneNumber_maxLength] }
                    ]);
                },

                OpeningHours: function (value) {
                    return baseModel.validate([
                        { maxLength: [value, 512, messages.OpeningHoursMaxLength] }
                    ]);
                },

                LatitudeLongitude: function (value) {
                    return baseModel.validate([
                        { require: [value, messages.Latitude_Longitude_require] }
                    ]);
                },

                EmailAddress: function (value) {
                    return baseModel.validate([
                        { email: [value, messages.EmailAddress_invalid] },
                        { maxLength: [value, 156, messages.EmailAddress_maxLength] }
                    ]);
                },

                Website: function (value) {
                    return baseModel.validate([
                        { url: [value, messages.WebsiteURL_invalid] }
                    ]);
                },

                Description: function (value) {
                    return baseModel.validate([
                        { maxLength: [value, 1000, messages.DescriptionMaxLength] }
                    ]);
                }
            }
        }
        //#endregion

    }
})();