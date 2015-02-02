(function () {
    'use strict';
    var controllerID = 'locationController';
    angular
        .module('app')
        .controller(controllerID, locationController);

    locationController.$inject = ['$scope', 'utils', '_', 'uiHelper', 'config', 'storeService', 'currentUser', 'locationModel', '$sce', 'GoogleMapApi'.ns(), 'locationDetailModel'];
    function locationController($scope, utils, _, uiHelper, config, storeService, currentUser, locationModel, $sce, GoogleMapApi, locationDetailModel) {
        var vm = this;
        vm.model = locationModel;
        //#region Gmap
        var markerTotal = 0;
        vm.events = {
            tilesloaded: function (map) {
                if (markerTotal < vm.model.data.length) {
                    $scope.$apply(function () {
                        var marker = new google.maps.Marker({
                            map: map,
                            position: map.getCenter(),
                            icon: config.image.MapMarker
                        });
                        markerTotal++;
                    });
                }
            }
        };
        //#endregion
        init();
        //#region exports
        _.extend(vm, {
            addLocationClick: addLocationClick,
            trustAsHtml: trustAsHtml,
            editLocationClick: editLocationClick,
            getNextPage: getNextPage
        });
        //#endregion
        //#region private
        function init() {
            var promises = [updateUI(), getData()];
            uiHelper.activateController(promises, controllerID);
        }

        function updateUI() {
            uiHelper.setPageTitle(config.title.location);
            uiHelper.activeHeaderItem(2);
        }

        /**
         * get data when page is loaded.
         * 
         * @return none
         */
        function getData() {
            /**********************************
                Clear data: performance improve
            ***********************************/
            vm.model.data = null;
            vm.model.CountCurrentRecord = 0;
            /*********************************/
            // if (vm.model.CountCurrentRecord === 0) {
                preloadNeededData();
                vm.model.CountCurrentRecord = 1;
            // }
        }

        /**
         * pre-load needed Data
         * 
         * @return {none}
         */
        function preloadNeededData() {
            utils.background(function () {
                vm.model.RetailerID = currentUser.RetailerID;
                vm.model.PageIndex = config.page.StartPage;
                vm.model.PageSize = config.page.PageSize - 1;
                uiHelper.mask(true);
                storeService.getRetailerStore(vm.model).then(function (data) {
                    if (!utils.isNull(data.Result)) {
                        vm.model.data = data.Result;
                        loadGMap(vm.model.data);
                    }
                    uiHelper.mask(false);
                });
            });
        }

        /**
         * get the next page : load more
         * 
         * @return {none}
         */
        function getNextPage () {
            if (!utils.isNull(vm.model.data) && vm.model.CountCurrentRecord != vm.model.data.length) {
                uiHelper.mask(true);
                vm.model.PageIndex++;
                storeService.getRetailerStore(vm.model).then(function (resp) {
                    if (!utils.isNull(resp.Result)) {
                        for (var i = 0; i < resp.Result.length; i++) {
                            vm.model.data.push(resp.Result[i]);
                        }
                        loadGMap(vm.model.data);
                    }
                    uiHelper.mask(false);
                });
                vm.model.CountCurrentRecord = utils.isNull(vm.model.data) ? 0 : vm.model.data.length;
            }
        }

        /**
         * Load GMap on location list page
         *                     
         * @param  {json}  data The list location store
         * @return {none}
         */
        function loadGMap (data) {
            for (var i = 0; i < vm.model.data.length; i++) {
                data[i].Center = { latitude: data[i].Latitude, longitude: data[i].Longitude };
                data[i].Zoom = 17;
                data[i].Options = { scrollwheel: false };
            }
        }

        /**
         * add location store
         */
        function addLocationClick() {
            locationDetailModel.isEdit = false;
            locationDetailModel.setData(getEmptyData());
            uiHelper.showModal(utils.viewPath('location', 'locations-add-option'));
        }

        /**
         * edit location store
         *     
         * @param  interger RetailerStoreID The id of RetailerStore
         * @return none
         */
        function editLocationClick(RetailerStoreID) {
            uiHelper.mask(true);
            storeService.getRetailerStoreDetail(RetailerStoreID).then(function (data) {
                uiHelper.mask(false);
                locationDetailModel.setData(data.Result);
                locationDetailModel.isEdit = true;
                var page = utils.viewPath('location', 'locations-form-detail');
                uiHelper.showModal(page);
            });
        }

        /**
         * trust as Html to display html element on Angular's view
         * 
         * @param  {string} html   The Html to view
         * @return {string}        The Html is trusted
         */
        function trustAsHtml(html) {
            return $sce.trustAsHtml(html);
        }

        /**
         * get empty data for add new location store
         *    
         * @return {json} empty data of LocationDetailModel
         */
        function getEmptyData() {
            return {
                data: null,
                uiModal: null,
                countries: null,
                paymentMethods: null,
                currencies: null,
                states: null,

                RetailerStoreID: 0,
                RetailerID: currentUser.RetailerID,
                StoreCode: null,
                StoreName: null,
                AddressLine1: null,
                AddressLine2: null,
                City: null,
                StateID: 1,
                PostCode: null,
                CountryID: 1,
                PhoneNumber1: null,
                PhoneNumber2: null,
                MobileNumber: null,
                Fax: null,
                Website: null,
                EmailAddress: null,
                Hours: null,
                Description: null,
                Latitude: null,
                Longitude: null
            }
        }
        //#endregion
    }
})();