(function () {
    'use strict';

    var moduleID = 'retailerService';
    angular
        .module('app')
        .factory(moduleID, retailerService);

    retailerService.$inject = ['$q', 'config', '$upload', 'baseService', 'getRetailerInfoResponseDTO', 'retailerRequestHelper'];
    function retailerService($q, config, $upload, baseService, getRetailerInfoResponseDTO, retailerRequestHelper) {
        //#region exports
        return {
            getRetailerInfo: getRetailerInfo,
            getAllCountries: getAllCountries,
            getAllStatesByCountryID: getAllStatesByCountryID,
            getAllCurrencies: getAllCurrencies,
            getAllPayoutMethods: getAllPayoutMethods,
            updateRetailerBrandDetail: updateRetailerBrandDetail,
            updateRetailerContactDetail: updateRetailerContactDetail,
            uploadStoreImage: uploadStoreImage,
            updateRetailerStoreDetail: updateRetailerStoreDetail,
            updateRetailerPaymentDetail: updateRetailerPaymentDetail,
            getAnalyticsOfRetailer: getAnalyticsOfRetailer,
            getRetailerListEventNotification: getRetailerListEventNotification,
            getRetailerListOrderNotification: getRetailerListOrderNotification,
            checkRetailerStoreIsExisted: checkRetailerStoreIsExisted
        };
        //#endregion

        //#region private
        function getRetailerInfo(params) {
            return baseService.get(
                    config.api.getRetailerInfo,
                    new retailerRequestHelper.getRetailerInfoRequestDTO(params)
                ).then(function (data) {
                    return new getRetailerInfoResponseDTO(data);
                });
        }

        function updateRetailerBrandDetail(params) {
            return baseService.post(
                    config.api.updateRetailerBrandDetail,
                    new retailerRequestHelper.updateRetailerBrandDetailsRequestDTO(params)
                ).then(function (data) {
                    return data;
                });
        }

        function updateRetailerContactDetail(params) {
            return baseService.post(
                    config.api.updateRetailerContactDetail,
                    new retailerRequestHelper.updateRetailerContactDetailsRequestDTO(params)
                ).then(function (data) {
                    return data;
                });
        }

        function updateRetailerStoreDetail(params) {
            return baseService.post(
                config.api.updateRetailerStoreDetail,
                new retailerRequestHelper.updateRetailerStoreDetailRequestDTO(params)
                ).then(function (data) {
                    return data;
                });
        }

        function uploadStoreImage(imageModel, fileImage) {
            return baseService.postWithFile(config.api.uploadStoreImage, imageModel, fileImage);  
        }
        
        function updateRetailerPaymentDetail(params) {
            return baseService.post(
                    config.api.updateRetailerPaymentDetail,
                    new retailerRequestHelper.updateRetailerPaymentDetailRequestDTO(params)
                ).then(function (data) {
                    return data;
                });
        }

        function getAllCountries() {
            return baseService.get(
                    config.api.getAllCountries,
                    null
                ).then(function (data) {
                    return data;
                });
        }

        /**
         * get all states by country id
         * 
         * @param  {interger} id The Country ID
         * @return {json}    List states of country id
         */
        function getAllStatesByCountryID (id) {
            return baseService.post(
                    config.api.getAllStatiesByCountryID,
                    { CountryID: id }
                ).then(function (data) {
                    return data;
                });
        }

        function getAllCurrencies() {
            return baseService.get(
                    config.api.getAllCurrencies,
                    null
                ).then(function (data) {
                    return data;
                });
        }

        function getAllPayoutMethods() {
            return baseService.get(
                    config.api.getAllPayoutMethods,
                    null
                ).then(function (data) {
                    return data;
                });
        }

        function getAnalyticsOfRetailer($params) {
            return baseService.post(
                    config.api.getAnalyticsOfRetailer,
                    { params: $params }
                ).then(function (data) {
                    return data;
                });
        }

        /**
         * get list product notifications by Retailer ID
         * 
         * @param  {json}   params The parameters
         * @return {json}          The data responsive from server
         */
        function getRetailerListEventNotification (params) {
            return baseService.get(
                    config.api.getRetailerListEventNotification,
                    params
                ).then(function (data) {
                    return data;
                });
        }

        /**
         * get list order notifications by Retailer ID
         * 
         * @param  {json}   params  The parameters
         * @return {json}           The data responsive from server
         */
        function getRetailerListOrderNotification (params) {
            return baseService.get(
                    config.api.getOrdersNotification,
                    params
                ).then(function (data) {
                    return data;
                });
        }

        function checkRetailerStoreIsExisted(params) {
            return baseService.post(
                   config.api.checkRetailerStoreIsExisted,
                   { 'StoreName': params }
               ).then(function (data) {
                   return data;
               });
        }
        //#endregion
    }
})();