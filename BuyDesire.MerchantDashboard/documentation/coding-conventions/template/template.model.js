(function () {
    'use strict';

    var modelID = 'sampleModel';
    angular
        .module('app')
        .factory(modelID, sampleModel);

    sampleModel.$inject = ['_'];
    function sampleModel(_) {
        //#region shared
        //TODO: 
        var shared = {
            completedStep: 0
        }
        //#endregion

        //#region constructor
        
        var model = function (params) {
            var defaults = {

            };
            _.extend(this, defaults, params);
        };
        //#endregion

        //#region exports
        _.extend(model.prototype, {
            getType: getType,
            setCompletedStep: setCompletedStep,
            getCompletedStep: getCompletedStep,
            shared: getShared
        });
        //#endregion

        //#region private
        function getType() {
            return modelID;
        }
        function uiModal(value) {
            if (value)
                shared.uiModal = value;
            return shared.uiModal;
        }
        function setCompletedStep(value) {
            if (value > shared.completedStep)
                shared.completedStep = value;
            return shared.completedStep;
        }
        function getCompletedStep() {
            return shared.completedStep;
        }
        function getShared() {
            return shared;
        }
        //#endregion

        return model;
    }
})();