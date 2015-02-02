(function () {
    'use strict';
    var controllerID = 'homeStoreController';
    angular
        .module('app')
        .controller(controllerID, homeStoreController);

    homeStoreController.$inject = ['config', 'utils', '_', 'uiHelper', 'homeModel', 'storeModel', 'retailerService'];
    function homeStoreController(config, utils, _, uiHelper, homeModel, storeModel, retailerService) {
        var vm = this;
        vm.model = homeModel;
        init();

        //#region exports
        _.extend(vm, {
            btnCancelClicked: btnCancelClicked,
            btnSaveClicked: btnSaveClicked,
            btnUpload: btnUpload
        });
        //#endregion

        //#region private
        function init() {
            var promises = [getData()];
            uiHelper.activateController(promises, controllerID);
        };

        function getData() {
            var item = new storeModel();
            if (vm.model.data != null) {
                item.RetailerID = vm.model.data.RetailerID;
                item.LogoImage = vm.model.data.LogoImage;
                item.CoverImage = vm.model.data.CoverImage;
                item.LogoImageUrl = vm.model.data.LogoImageUrl === '' ? config.image.LogoImageUrl : vm.model.data.LogoImageUrl;
                item.CoverImageUrl = vm.model.data.CoverImageUrl === '' ? config.image.CoverImageUrl : vm.model.data.CoverImageUrl;
                vm.isDisabled = !utils.isNull(item.LogoImage) && !utils.isNull(item.CoverImage) ? false : true;

                vm.model = new storeModel(item);
            }
        };

        function btnCancelClicked() {
            homeModel.restoreData();
            uiHelper.hideModal();
        };

        function btnSaveClicked() {
            uiHelper.mask(true);
            retailerService.updateRetailerStoreDetail(vm.model).then(function (data) {
                if (data.StatusCode == 100) {
                    // Note: vm.model.data.IsStoreAppearanceSetup = true; Will be throw an exception
                    homeModel.data.IsStoreAppearanceSetup = true;
                }
            });
            uiHelper.hideModal();
            uiHelper.mask(false);
        };

        function btnUpload($files, logoImage, coverImage) {
            uiHelper.mask(true); 
            var imageModel = new storeModel(vm.model);
            if (imageModel.RetailerID === null) {
                vm.msgLogoImageUrl = config.validate.home.RetailerID_require;
            } else {
                if (logoImage !== '') {
                    imageModel.LogoImage = logoImage;
                    imageModel.CoverImage = '';
                }
                if (coverImage !== '') {
                    imageModel.CoverImage = coverImage;
                    imageModel.LogoImage = '';
                }

                if (utils.checkUploadImage($files[0]) === false) {
                    if (logoImage !== '') {
                        vm.msgLogoImageUrl = config.validate.image.Error_Upload_Image_Invalid;
                    }
                    if (coverImage !== '') {
                        vm.msgCoverImageUrl = config.validate.image.Error_Upload_Image_Invalid;
                    }

                    uiHelper.mask(false);
                }
                else {
                    retailerService.uploadStoreImage(imageModel, $files[0]).then(function (data) {
                        if (data.StatusCode === 100) {
                            if (logoImage !== '') {
                                imageModel.LogoImageUrl = data.Result.LogoImageUrl;
                                imageModel.LogoImage = '';
                                vm.model.LogoImageUrl = imageModel.LogoImageUrl;
                                homeModel.data.LogoImageUrl = data.Result.LogoImageUrl;
                            }
                            if (coverImage !== '') {
                                imageModel.CoverImageUrl = data.Result.CoverImageUrl;
                                imageModel.CoverImage = '';
                                vm.model.CoverImageUrl = imageModel.CoverImageUrl;
                                homeModel.data.CoverImageUrl = data.Result.CoverImageUrl;
                            }
                        } else {
                            if (logoImage !== '') {
                                vm.msgLogoImageUrl = config.validate.image.Error_Upload_Image_Server;
                            }
                            if (coverImage !== '') {
                                vm.msgCoverImageUrl = config.validate.image.Error_Upload_Image_Server;
                            }
                        }

                        uiHelper.mask(false);
                    });
                }
                vm.isDisabled = imageModel.LogoImageUrl !== config.image.LogoImageUrl && imageModel.LogoImageUrl !== config.image.LogoImageUrl ? false : true;
            }
        };
        //#endregion
    }
})();