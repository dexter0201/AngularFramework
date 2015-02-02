(function () {
    'use strict';

    var modelID = 'userModel';
    
    angular
        .module('app')
        .factory(modelID, userModel);

    userModel.$inject = ['_'];
    function userModel(_) {

       //#region Constructor
       var model = function (params) {
           var defaults = {
               ID: null,
               Email: null,
               Name: null,
               Address: null,
               Phone: null
           };
            
           //_.extend(this, defaults, params);

           var keys = _.keys(defaults);
           var result = _.pick(params, function (value, key, object) {
               return _.indexOf(keys, key) > -1;
           });
           _.extend(this, result);
       };
       //#endregion

       //#region Method
       _.extend(model.prototype, {
           isNew: isNew,
           getFullName: getFullName,
           getType: getType
       });

       function isNew() {
           return (this.ID === null);
       }

       function getType() {
           return modelID;
       }

       function getFullName() {
           return this.firstName + ' ' + this.lastName;
       }

       //#endregion

       return model;
    }
})();