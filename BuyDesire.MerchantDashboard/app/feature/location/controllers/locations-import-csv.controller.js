(function () {
    'use strict';
    var controllerID = 'locationImportCSVController';
    angular
        .module('app')
        .controller(controllerID, locationImportCSVController);

    locationImportCSVController.$inject = ['config', 'utils', '_', 'uiHelper', 'locationModel', 'storeModel', 'locationService', 'locationImportCSVModel', '$interval'];
    function locationImportCSVController(config, utils, _, uiHelper, locationModel, storeModel, locationService, locationImportCSVModel, $interval) {
        var vm = this;
        vm.model = locationImportCSVModel;
        init();


        //#region exports
        _.extend(vm, {
            btnCancelClicked: btnCancelClicked,
            btnSaveClicked: btnSaveClicked,
            btnUpload: btnUpload,
            btnPreviewClicked: btnPreviewClicked,
            btnDownloadClicked: btnDownloadClicked
        });
        //#endregion

        //#region private
        function init() {
            var promises = [getData()];
            uiHelper.activateController(promises, controllerID);
        };

        function getData() {
            if (vm.model.sessionID)
                updateImportStatus();
        };

        function btnCancelClicked() {
            updateInprogress(false);
            uiHelper.hideModal();
        };

        function btnSaveClicked() {
            if (vm.model.file && IsValidateFileType(vm.model.fileName)) {
                utils.showInfo('Start importing');
                showError(false);
                updateInprogress(true);
                locationService.importLocation(vm.model.file).then(function (data) {
                    if (utils.isSuccessResponseDTO(data) && data.Result) {
                        vm.model.sessionID = data.Result;
                        updateImportStatus();
                    }
                });
            } else {
                showError(true);
            }
        };

        function updateInprogress(value) {
            vm.model.fileName = '';
            vm.model.inprogress = value;
        }

        function showError(value) {
            vm.model.showError = value;
        }

        function showInvalidFile(value) {
            vm.model.invalidFile = value;
        }

        function updateImportStatus() {
            locationService.getImportLocationStatus(vm.model.sessionID).then(function (data) {
                var total = parseInt(data.ItemsCount);
                var processedCount = parseInt(data.ItemsProcessedCount);
                var failureCount = data && data.Response ? data.Response.FailureCount : 0;
                var successCount = processedCount - failureCount;
                vm.model.successPercent = Math.round(100 * successCount / total);
                vm.model.failurePercent = Math.round(100 * failureCount / total);
                if (data.IsCompleted) {
                    //report
                    utils.showSuccess('Import successfully');
                } else {
                    _.delay(function () { updateImportStatus(); }, config.timer.pullrequest);

                }
            });
        }

        function btnUpload($files) {
            vm.model.file = $files[0];
            vm.model.fileName = $files[0].name;
            showError(false);
            showInvalidFile(!IsValidateFileType(vm.model.fileName));

        };

        function IsValidateFileType(name) {
            if (name.indexOf('.csv') > -1 || name.indexOf('.xls') > -1 || name.indexOf('.xlsx') > -1)
                return true;
            return false;
        }

        function btnPreviewClicked() {
            window.open(config.url.locationCSVTemplate, 'PreviewCSVTemplate');
        }

        function btnDownloadClicked() {
            window.open(config.url.locationCSVTemplate, 'DownloadCSVTemplate');
        }
    }
})();