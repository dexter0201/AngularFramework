(function () {
    'use strict';
    var controllerID = 'orderController';
    angular
        .module('app')
        .controller(controllerID, orderController);

    orderController.$inject = ['utils', '_', 'uiHelper', 'orderService', 'currentUser', 'ordersModel', 'config', 'orderDetailsModel'];
    function orderController(utils, _, uiHelper, orderService, currentUser, ordersModel, config, orderDetailsModel) {
        var vm = this;
        vm.model = ordersModel;
        init();

        //#region exports
        _.extend(vm, {
            closeModal: closeModal,
            openOrderDetailsModal: openOrderDetailsModal
        });
        //#endregion

        //#region private
        function init() {
            var promises = [getData()];
            uiHelper.activateController(promises, controllerID);
        }

        function getData() {
            if (utils.isNull(vm.model.allOrder)) {
                uiHelper.mask(true);
                orderService.getAll({
                    RetailerID: 1, //currentUser.RetailerID,
                    Content: '',
                    OrderType: '',
                    PageIndex: 0,
                    PageSize: config.page.PageSize
                }).then(function (data) {
                    if (data.StatusCode === 100 && data.Result.length !== 0) {
                        vm.model.allOrder = data.Result;
                    }
                    uiHelper.mask(false);
                });
            }
            preloadData();
        }

        /**
         * pre-load data
         * 
         * @return {json} The data responsive from Server
         */
        function preloadData () {
            utils.background(function () {
                // get list active orders
                if (utils.isNull(vm.model.activeOrder)) {
                    orderService.getAll({
                        RetailerID: 1, //currentUser.RetailerID,
                        Content: '',
                        OrderType: 'Processing',
                        PageIndex: 0,
                        PageSize: config.page.PageSize
                    }).then(function (data) {
                        if (data.StatusCode === 100 && data.Result.length !== 0) {
                            vm.model.activeOrder = data.Result;
                        }
                        uiHelper.mask(false);
                    });
                }
                // get list completed orders
                if (utils.isNull(vm.model.completedOrder)) {
                    orderService.getAll({
                        RetailerID: 1, //currentUser.RetailerID,
                        Content: '',
                        OrderType: 'Complete',
                        PageIndex: 0,
                        PageSize: config.page.PageSize
                    }).then(function (data) {
                        if (data.StatusCode === 100 && data.Result.length !== 0) {
                            vm.model.completedOrder = data.Result;
                        }
                        uiHelper.mask(false);
                    });
                }
                // get list cancelled orders
                if (utils.isNull(vm.model.CancelledOrder)) {
                    orderService.getAll({
                        RetailerID: 1, //currentUser.RetailerID,
                        Content: '',
                        OrderType: 'Cancelled',
                        PageIndex: 0,
                        PageSize: config.page.PageSize
                    }).then(function (data) {
                        if (data.StatusCode === 100 && data.Result.length !== 0) {
                            vm.model.CancelledOrder = data.Result;
                        }
                        uiHelper.mask(false);
                    });
                }
            });
        }

        function closeModal() {
            uiHelper.hideModal();
        }

        /**
         * Show popup Order details modal
         * 
         */
        function openOrderDetailsModal(orderDetailsID) {
            uiHelper.mask(true);
            orderService.getByID({
                OrderNumber: orderDetailsID,
                RetailerID: 1,// currentUser.RetailerID,
            }).then(function (data) {
                uiHelper.mask(false);
                if (data.StatusCode === 100 && data.Result.length !== 0) {
                    orderDetailsModel.set(data.Result);
                    uiHelper.showModal(utils.viewPath('order', 'order-details'));
                }
            });
        }

        //#endregion
    }
})();