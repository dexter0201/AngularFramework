(function () {
    'use strict';

    var modelID = 'layoutModel';
    angular
        .module('app')
        .factory(modelID, layoutModel);

    layoutModel.$inject = ['_', 'utils'];
    function layoutModel(_, utils) {
        //#region shared
        var shared = {
            showLoading: false
        }
        //#endregion

        //#region Constructor
        var model = function (params) {
            var defaults = {

            };
            _.extend(this, defaults, params);
        };
        //#endregion

        //#region exports
        _.extend(model.prototype, {
            getType: getType,
            shared: getShared,
            headerPath: headerPath,
            loadingPath: loadingPath
        });
        //#endregion

        //#region private
        function getType() {
            return modelID;
        }

        function getShared() {
            return shared;
        }

        function headerPath() {
            return utils.viewPath('shared/partial', 'header');
        }

        function loadingPath() {
            return utils.viewPath('shared/partial', 'loading');
        }
        //#endregion

        return model;
    }
})();