(function () {
    'use strict';
    var controllerID = 'DatepickerController';
    angular
        .module('app')
        .controller(controllerID, DatepickerController);

    DatepickerController.$inject = ['utils', '_', 'uiHelper', '$scope', '$q', 'datePickerModel'];
    function DatepickerController(utils, _, uiHelper, $scope, $q, datePickerModel) {

        //#region exports
        var vm = this;
        vm.model = datePickerModel;
        init();

        _.extend(vm, {
            disabled: disabled,
            open: open
        });
        //#endregion

        //#region Private
        function init() {
            var promises = [getToday(), toggleMin(), initModelData()];
            uiHelper.activateController(promises, controllerID);
        }

        function getToday () {
            vm.model.dt = new Date();
        }
        
        function clearDate () {
            vm.model.dt = null;
        }

        // Disable weekend selection
        function disabled(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        function toggleMin () {
            vm.model.minDate = vm.model.minDate ? null : new Date();
        }

        function open ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            datePickerModel.opened = true;
        }

        function initModelData () {
            vm.model.dateOptions = {
                'format-month'  : 'MMM',
                'formatYear'    : 'yyyy',
                'startingDay'   : 1,
                'show-weeks'    : false,
            };

            vm.model.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            vm.model.format = vm.model.formats[0];
        }
        //#endregion
    }
})();