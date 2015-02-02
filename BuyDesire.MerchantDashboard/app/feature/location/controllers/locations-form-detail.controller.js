(function () {
    'use strict';
    var controllerID = 'locationFormDetailsController';
    angular
        .module('app')
        .controller(controllerID, locationFormDetailsController);

    locationFormDetailsController.$inject = ['utils', '_', 'uiHelper', 'locationModel', 'GoogleMapApi'.ns(), 'retailerService', 'locationDetailModel', 'storeService', '$scope', 'config', 'currentUser'];
    function locationFormDetailsController(utils, _, uiHelper, locationModel, GoogleMapApi, retailerService, locationDetailModel, storeService, $scope, config, currentUser) {
        var vm = this;
        vm.model = locationDetailModel;
        //#region GMAP             
        vm.zoom = 17;
        vm.options = { scrollwheel: true };
        vm.tmpChoice = 1;
        var gmap = null;
        var marker = null;
        var infobox = null;
        vm.center = { latitude: vm.model.Latitude, longitude: vm.model.Longitude };
        vm.events = {
            tilesloaded: function (map) {
                uiHelper.mask(false);
                $scope.$apply(function () {
                    gmap = map;
                    if (marker == null) {
                        marker = new google.maps.Marker({
                            map: map,
                            position: map.getCenter(),
                            icon: config.image.MapMarker
                        });                        
                        infobox = new google.maps.InfoWindow({                            
                        });
                        resetContentInfoBox();
                        google.maps.event.addListener(marker, 'click', function () {
                            infobox.open(map, marker);
                        });
                    }
                });
            }
        };
        //#endregion

        init();
        //#region exports
        _.extend(vm, {
            btnSaveClicked: btnSaveClicked,
            btnCancelClicked: btnCancelClicked,
            getChoice: getChoice,
            geoCode: geoCode,
            resetContentInfoBox: resetContentInfoBox,
            loadStates: loadStates
        });
        //#endregion

        //#region private
        function init() {
            uiHelper.mask(true);
            var promises = [getData()];
            uiHelper.activateController(promises, controllerID);
        }

        function getData() {
            retailerService.getAllCountries().then(function (data) {
                vm.model.countries = data.Result;
                loadStates(vm.model.CountryID);
            });
        }

        /**
         * load states by country id
         * 
         * @param  {interger} CountryID The country id
         * @return {none}
         */
        function loadStates (CountryID) {
            retailerService.getAllStatesByCountryID(CountryID).then(function (data) {
                if (data.Result.length !== 0) {
                    vm.model.states = data.Result;
                    vm.model.StateID = 1;
                }
                else {
                    vm.model.states = null;
                    vm.model.StateID = '';
                }
            });
        }

        function getChoice(id) {
            if (vm.tmpChoice == id) {
                return 'active';
            }
            return '';
        }

        function btnCancelClicked() {
            uiHelper.hideModal();
        }

        /**
         * add new || update location store detail
         * 
         * @param  {interger} RetailerStoreID The Retailer Store ID
         * @return {none}
         */
        function btnSaveClicked(RetailerStoreID) {
            vm.model.RetailerStoreID = RetailerStoreID;
            vm.model.StateID = vm.model.StateID == '' ? 0 : vm.model.StateID;
            uiHelper.mask(true);
            storeService.updateRetailerStoreLocation(locationDetailModel).then(function (data) {
                uiHelper.mask(false);
                vm.FailureStoreCode = false;
                vm.FailureStoreName = false;
                if (utils.isSuccessResponseDTO(data)) {
                    locationModel.PageSize = config.page.PageSize - 1;
                    locationModel.PageIndex = config.page.StartPage;
                    storeService.getRetailerStore(locationModel).then(function (data) {
                        uiHelper.mask(false);
                        locationModel.data = data.Result;
                        loadGMapData(locationModel.data);
                        uiHelper.hideModal();
                    });
                } else if (data.Messages.StoreCode != null && data.Messages.StoreCode != '') {
                    vm.FailureStoreCode = true;
                    vm.MessagesStoreCode = data.Messages.StoreCode;
                } else if (data.Messages.StoreName != null && data.Messages.StoreName != '') {
                    vm.FailureStoreName = true;
                    vm.MessagesStoreName = data.Messages.StoreName;
                }
            });
        }

        /**
         * Load GMap on location list page
         *                     
         * @param  {json}  data The list location store
         * @return {none}
         */
        function loadGMapData (data) {
            for (var i = 0; i < locationModel.data.length; i++) {
                data[i].Center = { latitude: data[i].Latitude, longitude: data[i].Longitude };
                data[i].Zoom = 17;
                data[i].Options = { scrollwheel: false };
            }
            locationModel.markerTotal = 0;
        }

        function resetCenter() {
            vm.center.latitude = vm.model.Latitude;
            vm.center.longitude = vm.model.Longitude;
        }

        function resetContentInfoBox() {            
            infobox.setContent(getContentInfobox());
            // infobox.open(gmap, marker);
        }

        function geoCode() {            
            if (vm.tmpChoice == 1) {
                var latlng = new google.maps.LatLng(vm.model.Latitude, vm.model.Longitude);
                marker.setPosition(latlng);
                resetCenter();
                resetContentInfoBox();
            }
            else {
                var geoCoder = new google.maps.Geocoder();
                geoCoder.geocode({ address: vm.address }, function (result, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var location = result[0].geometry.location;
                        marker.setPosition(location);
                        vm.model.Latitude = location.lat();
                        vm.model.Longitude = location.lng();
                        resetCenter();
                        resetContentInfoBox();
                    }
                });
            }
        }
        
        function getContentInfobox() {
            var content = '';
            var storeName = vm.model.StoreName ? vm.model.StoreName : 'No store name';
            var address = vm.model.AddressLine1 ? vm.model.AddressLine1 : 'No address';
            var hours = vm.model.Hours ? vm.model.Hours : 'No opening hours';
            var phone = vm.model.PhoneNumber1 ? vm.model.PhoneNumber1 : 'No phone number';                
            return '<div class="infobox">'
                + '<h3>' + storeName + '</h3>'
                + '<label>Address</label>'
                + '<p>' + address + '</p>'
                + '<label>Opening hours</label>'
                + '<p>' + hours + '</p>'
                + '<label>'+ phone + '</label>'
                + '</div>';
        }
        //#endregion
    }
})();