(function () {
    'use strict';

    var modelID = 'orderDetailsModel';
    angular
        .module('app')
        .factory(modelID, orderDetailsModel);

    orderDetailsModel.$inject = ['_', 'baseModel', 'config'];
    function orderDetailsModel(_, baseModel, config) {
        //#region exports

        //properties
        var shared = {
            RetailerID: null,
            OrderNumber: null,
            OrderDate: null,
            FullName: null,
            Address1: null,
            EmailAddress: null,
            PhoneNumber: null,
            PaymentGateway: null,
            Total: null,
            Discount: null,
            GiftingCost: null,
            ShippingCost: null,
            AmountPaid: null,
            ListOrder: null
        }

        //methods
        _.extend(shared, {
            set: set
        });
        return shared;
        //#endregion

        //#region private
        function set (params) {
            var keys = _.keys(shared);
            return _.pick(keys, function (value, key, object) {
                if (value !== 'set') {
                    shared[value] = params[value];
                }
            })
        }

        //#endregion

    }
})();