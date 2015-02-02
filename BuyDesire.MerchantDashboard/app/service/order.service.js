(function () {
    'use strict';

    angular
        .module('app')
        .factory('orderService', orderService);

    orderService.$inject = ['$q', 'orderModel', 'baseService', '_', 'config'];
    function orderService($q, orderModel, baseService, _, config) {
        //#region exports
        return {
            getAll: getAll,
            getByID: getByID
        };
        //#endregion

        //#region private
        function getAll(params) {
            return baseService.get(
                config.api.getOrders,
                params
            ).then(function (data) {
                return data;
            });
        }

        /**
         * get order details by order ID
         * 
         * @param  {json}   params  The paramerter
         * @return {json}   data    The data responsive form server
         */
        function getByID(params) {
            return baseService.get(
                config.api.getOrderByID,
                params
            ).then(function (data) {
                return data;
            });
        }
        //#endregion
    }
})();