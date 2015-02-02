(function () {
    'use strict';

    var moduleID = 'productService';
    angular
        .module('app')
        .factory(moduleID, productService);

    productService.$inject = ['$q', 'config', 'baseService', 'currentUser'];
    function productService($q, config, baseService, currentUser) {
        //#region exports
        return {
            importProduct: importProduct,
            getImportProductStatus: getImportProductStatus
        };
        //#endregion

        //#region private

        function importProduct(file) {
            return baseService.postWithFile(
                    config.api.importProduct,
                    { RetailerID: currentUser.RetailerID },
                    file
                ).then(function (data) {
                    return data;
                });
        }

        function getImportProductStatus(sessionID) {
            return baseService.get(
                    config.api.getImportProductStatus + sessionID, {}
                ).then(function (data) {
                    return data;
                });
        }
        //#endregion
    }
})();