(function () {
    'use strict';

    var modelID = 'usersModel';
    angular
        .module('app')
        .factory(modelID, usersModel);

    usersModel.$inject = ['_', 'userModel'];
    function usersModel(_, userModel) {

        //#region Constructor
        var model = function (param) {
            var defaults = {
                users : null
            };
            if (!_.isEmpty(param)) {
                defaults.users = [];//array of userModel
                _.each(param.users, function (user) {
                    defaults.users.push(new userModel(user));
                });
            }
            //return defaults;
            _.extend(this, defaults);
        };
        //#endregion

        //#region Method
        _.extend(model.prototype, {
            getType: getType
        });

        function getType() {
            return modelID;
        }
        //#endregion

        return model;
    }
})();