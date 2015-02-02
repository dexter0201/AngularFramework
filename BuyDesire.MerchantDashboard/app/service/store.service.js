(function () {
    'use strict';

    var moduleID = 'storeService';
    angular
        .module('app')
        .factory(moduleID, storeService);

    storeService.$inject = ['$q', '$upload', 'config', 'uiHelper', 'storeModel', 'baseService', '_', 'updateRetailerLocationRequestDTO', 'getRetailerStoreRequestDTO'];
    function storeService($q, $upload, config, uiHelper, storeModel, baseService, _, updateRetailerLocationRequestDTO, getRetailerStoreRequestDTO) {
        //#region exports
        return {
            getStoreDefault: getStoreDefault,
            getRetailerStore: getRetailerStore,
            updateRetailerStoreLocation: updateRetailerStoreLocation,
            getRetailerStoreDetail: getRetailerStoreDetail
        };
        //#endregion

        //#region private
        function getStoreDefault() {
            var data = {
                data: [
                    {
                        RetailerID: null,
                        RetailerLogoImage: null,
                        RetailerCoverImage: null
                    },
                ]
            };

            return $q.when(data);
        }

        /**
         * Locations: get list location
         * 
         * @param  integer id   RetailerID
         * @return json         Ajax responsive    
         */
        function getRetailerStore(locationModel) {
            return baseService.post(config.api.getRetailerStore, new getRetailerStoreRequestDTO(locationModel));
        }

        function getRetailerStoreDetail(id) {
            return baseService.post(
                    config.api.getRetailerStoreDetail,
                    { RetailerStoreID: id }
                ).then(function (data) {
                    return data;
                });
        }

        function getAnalysisOfRetailer($type) {
            return baseService.post(
                    config.api.getRetailerStoreDetail,
                    { RetailerStoreID: id }
                ).then(function (data) {
                    return data;
                });
        }

        function updateRetailerStoreLocation(locationDetailModel) {
            return baseService.post(
                    config.api.updateRetailerStoreLocation,
                    new updateRetailerLocationRequestDTO(locationDetailModel)
                ).then(function (data) {
                    return data;
                });
        }
        //#endregion
    }
})();