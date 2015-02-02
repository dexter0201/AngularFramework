(function () {
    'use strict';

    var modelID = 'productNotificationModel';
    angular
        .module('app')
        .factory(modelID, productNotificationModel);

    productNotificationModel.$inject = ['_', 'baseModel', 'config'];
    function productNotificationModel(_, baseModel, config) {
        //#region exports

        //properties
        var shared = {
            UserName: null,
            ProfileImage: null,
            EventOwnerUserID: null,
            EventTypeID: null,
            EventName: null,
            WishListID: null,
            ProductVariantName: null,
            MediumImage: null,
            CreatedOn: null
        }

        //methods
        _.extend(shared, {

        });
        return shared;
        //#endregion

        //#region private

        //#endregion
    }
})();