(function () {
    'use strict';

    var modelID = 'storeModel';
    angular
        .module('app')
        .factory(modelID, storeModel);

    storeModel.$inject = ['_'];
    function storeModel(_) {
        //#region constructor
        var model = function (params) {
            var defaults = {
                RetailerID: null,
                LogoImage: null,
                CoverImage: null,
                LogoImageUrl: '/assets/images/no-logo.jpg',
                CoverImageUrl: '/assets/images/no-cover.jpg'
            };
            _.extend(this, defaults, params);
        };
        //#endregion

        //#region exports
        _.extend(model.prototype, {
            //shared between controllers
        });
        //#endregion

        //#region private
        //#endregion

        //#region shared between controllers
        //#endregion

        return model;
    }
})();