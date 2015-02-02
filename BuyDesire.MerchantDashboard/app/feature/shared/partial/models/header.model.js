(function () {
    'use strict';

    var modelID = 'headerModel';
    angular
        .module('app')
        .factory(modelID, headerModel);//modelName is the same with modelID

    headerModel.$inject = ['_'];
    function headerModel(_) {
        //#region exports
        var model = {
            items: {
                Dashboard: { title: 'Dashboard', url: '/#/dashboard', badge: null, index: 1 },
                Locations: { title: 'Locations', url: '/#/location/locations', badge: null, index: 2 },
                Products: { title: 'Products', url: '/#/product/products', badge: null, list: null, index: 3 },
                Orders: { title: 'Orders', url: '/#/order/orders', badge: null, list: null, orderDetailsList: [], index: 4 },
                // Promote: { title: 'Promote', url: null, badge: null, index: 5 }
            },
            currentItem: null,
            cbBusyFulfilled: false
        }

        _.extend(model, {

        });

        return model;
        //#endregion

        //#region private

        //#endregion
    }
})();