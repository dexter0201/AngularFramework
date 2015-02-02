(function () {
    'use strict';

    var modelID = 'getRetailerInfoResponseDTO';
    angular
        .module('app')
        .factory(modelID, getRetailerInfoResponseDTO);

    getRetailerInfoResponseDTO.$inject = ['_', 'baseResponseDTO'];
    function getRetailerInfoResponseDTO(_, baseResponseDTO) {
        //#region constructor
        var model = function (params) {
            var defaults = {
                RetailerID: null,
                IsBrandDetailsSetup: null,
                IsStoreAppearanceSetup: null,
                IsContactDetailsSetup: null,
                IsPaymentInformationSetup: null,
                StorefrontDomain: null,
                Tagline: null,
                Description: null,
                LogoImage: null,
                LogoImageUrl: null,
                CoverImage: null,
                CoverImageUrl: null,
                EmailAddress: null,
                WebsiteURL: null,
                PhoneNumber: null,
                Address1: null,
                Address2: null,
                City: null,
                StateName: null,
                PostCode: null,
                CountryID: null,
                PreferredStoreThemeID: null,
                PreferredPaymentMethodID: null,
                PayPalEmailAddress: null,
                BaseCurrencyCode: null
            };
            _.extend(this, new baseResponseDTO(params, defaults));
        };
        //#endregion

        return model;
    }
})();