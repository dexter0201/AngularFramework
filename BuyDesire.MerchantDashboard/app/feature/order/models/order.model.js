(function () {
    'use strict';

    var modelID = 'orderModel';
    angular
        .module('app')
        .factory(modelID, orderModel);

    orderModel.$inject = ['_', 'baseModel', 'config'];
    function orderModel(_, baseModel, config) {
        //#region exports

        //properties
        var shared = {
        }
        //#region Constructor
        var model = function (params) {
            var defaults = {
                OrderNumber: null,
                OrderDate: null,
                FullName: null,
                PaymentType: null,
                ShippingMethodType: null,
                AmountPaid: null,
                Total: null
            };

            //_.extend(this, defaults, params);

            var keys = _.keys(defaults);
            var result = _.pick(params, function (value, key, object) {
               return _.indexOf(keys, key) > -1;
            });
            _.extend(this, result);
        };
       //#endregion

        //methods
        _.extend(model.prototype, {

        });
        return model;
        //#endregion

        //#region private

        //#endregion

    }
})();