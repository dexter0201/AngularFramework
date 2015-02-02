(function () {
    'use strict';

    var modelID = 'currentUser';
    angular
        .module('app')
        .factory(modelID, currentUser);

    currentUser.$inject = ['_', 'loginModel'];
    function currentUser(_, loginModel) {
        //#region exports
        var model = {
            UserID: null,
            UserName: null,
            RetailerID: null,
            Remember: true
        }

        _.extend(model, {
            isNull: isNull,
            set: set
        });
        return model;
        //#endregion

        //#region exports
        function isNull() {
            return !(model.UserID > 0);
        }

        function set(params) {
            model.UserID = _.isNull(params) ? null : params.UserID;
            model.UserName = _.isNull(params) ? null : params.UserName;
            model.RetailerID = _.isNull(params) ? null : params.RetailerID;
            model.Remember = _.isNull(loginModel.Remember) || _.isNull(params)  ? null : loginModel.Remember;
        }
        //#endregion
    }
})();