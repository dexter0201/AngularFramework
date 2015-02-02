(function () {
    'use strict';
    var controllerID = 'headerController';
    angular
        .module('app')
        .controller(controllerID, headerController);

    headerController.$inject = [
        'utils', '_',
        'uiHelper',
        'headerModel',
        'config',
        'retailerService',
        'authHelper', '$location',
        'currentUser',
        'homeModel',
        'registerModel',
        'forgotPasswordModel',
        'orderService',
        'orderDetailsModel'
    ];
    function headerController(utils, _, uiHelper, headerModel, config, retailerService, authHelper, $location, currentUser, homeModel, registerModel, forgotPasswordModel, orderService, orderDetailsModel) {
        var vm = this;
        vm.model = headerModel;
        vm.currentUser = currentUser;
        init();

        //#region exports
        _.extend(vm, {
            btnSignOutClicked: btnSignOutClicked,
            viewAllClick: viewAllClick,
            setCurrentItem: setCurrentItem,
            openOrderDetailsModal: openOrderDetailsModal
        });
        //#endregion

        //#region private
        function init() {
            var promises = [getData()];
            uiHelper.activateController(promises, controllerID);
        }

        /**
         * get Data when header is loader
         * 
         * @return {none}
         */
        function getData () {
            if (!currentUser.isNull()) {
                preloadNeededData();
            }
        }

        /**
         * pre-load needed Data
         * 
         * @return {none}
         */
        function preloadNeededData () {
            utils.background(function () {
                // get list product notifications
                if (utils.isNull(vm.model.items.Products.list)) {
                    retailerService.getRetailerListEventNotification({
                        RetailerID: 45653,//currentUser.RetailerID,
                        PageIndex: 0,
                        PageSize: config.page.PageSize
                    })
                    .then(function (data) {
                        if (data.StatusCode === 100 && data.Result.length !== 0) {
                            var today = new Date();
                            _.each(data.Result.ListEventNotification, function (noti) {
                                var diff = Math.floor((Date.parse(today) - Date.parse(noti.CreatedOn)) / (1000*60*60*24));
                                noti.CreatedOn = diff;
                            });
                            vm.model.items.Products.badge = data.Result.TotalNotifi;
                            vm.model.items.Products.list = data.Result.ListEventNotification;
                        }
                    });
                }
                // get list order notifications
                if (utils.isNull(vm.model.items.Orders.list)) {
                    retailerService.getRetailerListOrderNotification({
                        RetailerID: 1,//currentUser.RetailerID,
                        PageIndex: 0,
                        PageSize: 3
                    }).then(function (data) {
                        if (data.StatusCode === 100 && data.Result.length !== 0) {
                            var today = new Date();
                            _.each(data.Result.ListOrders, function (order) {
                                var diff = Math.floor((Date.parse(today) - Date.parse(order.OrderDate)) / (1000*60*60*24));
                                order.OrderAgo = diff;
                            });
                            vm.model.items.Orders.badge = data.Result.TotalOrder;
                            vm.model.items.Orders.list = data.Result.ListOrders;

                            // get list order details
                            utils.background(function () {
                                _.each(vm.model.items.Orders.list, function (order) {
                                    orderService.getByID({
                                        OrderNumber: order.OrderNumber,
                                        RetailerID: 1,// currentUser.RetailerID,
                                    }).then(function (respon) {
                                        uiHelper.mask(false);
                                        if (respon.StatusCode === 100 && respon.Result.length !== 0) {
                                            vm.model.items.Orders.orderDetailsList[order.OrderNumber] = respon.Result;
                                        }
                                    });
                                });
                            });
                        }
                    });
                }
            });
        }

        /**
         * view all notifications
         * 
         * @return {none}
         */
        function viewAllClick () {
            vm.promise = retailerService.getRetailerListEventNotification({
                RetailerID: 45653,//currentUser.RetailerID,
                PageIndex: 0,
                PageSize: vm.model.items.Products.badge
            })
            .then(function (data) {
                if (data.StatusCode === 100 && data.Result.length !== 0) {
                    var today = new Date();
                    _.each(data.Result.ListEventNotification, function (noti) {
                        var diff = Math.floor((Date.parse(today) - Date.parse(noti.CreatedOn)) / (1000*60*60*24));
                        noti.CreatedOn = diff;
                    });
                    vm.model.items.Products.list = data.Result.ListEventNotification;
                    vm.model.cbBusyFulfilled = true;
                }
            });
        }

        /**
         * Logout
         *   
         * @return {none}
         */
        function btnSignOutClicked() {
            currentUser.Remember = false;
            authHelper.setCurrentUser(null);
            // clear current data
            clearData();
            $location.path('/user/login');
        }

        /**
         * Clear current data
         * 
         * @return {none}
         */
        function clearData () {
            forgotPasswordModel.setNull();
            registerModel.setNull();
            homeModel.data = null;
        }

        /**
         * set current selected item on header menu
         * 
         * @param {integer} value The index value
         */
        function setCurrentItem (value) {
            vm.model.currentItem = value;
        }

        /**
         * Show popup Order details modal
         * 
         */
        function openOrderDetailsModal(orderDetailsID) {
            if (!_.has(vm.model.items.Orders.orderDetailsList, orderDetailsID)) {
                // callback have not responsive yet...
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
            } else {
                orderDetailsModel.set(vm.model.items.Orders.orderDetailsList[orderDetailsID]);
                uiHelper.showModal(utils.viewPath('order', 'order-details'));
            } 
        }
        //#endregion
    }
})();