(function () {
    'use strict';

    var modelID = 'tamSampleModel';

    angular
        .module('app')
        .factory(modelID, tamSampleModel);
    tamSampleModel.$inject = ['_'];
    function tamSampleModel(_) {

        //#region Constructor
        var model = function (params) {
            var defaults = {
                Email: null,
                Name: null,
                Telephone: null
            };
            //_.extend(this, defaults, params);
            var keys = _.keys(defaults);
            var result = _.pick(params, function (value, key, object) {
                return _.indexOf(keys, key) > -1;
            });
            _.extend(this, result);
        };

        _.extend(model.prototype, {
            getType: getType,
        });
        function getType() {
            return modelID;
        }

        return model;
    }
})();