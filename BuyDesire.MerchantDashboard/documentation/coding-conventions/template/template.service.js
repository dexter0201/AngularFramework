(function () {
    'use strict';

    var moduleID = 'productService';
    angular
        .module('app')
        .factory(moduleID, productService);

    productService.$inject = ['$q', 'baseService', 'config'];
    function productService($q, baseService, _) {
        //#region exports
        return {
            getAll: getAll,
            getByID: getByID
        };
        //#endregion

        //#region private
        function getAll() {
            return baseService.get(config.api.getProducts, {});
        }

        function getByID(id) {
            return baseService.get(config.api.getProductByID, { id: id });
        }
        //#endregion
    }
})();