(function () {
    'use strict';

    angular
        .module('app')
        .factory('uiHelper', uiHelper);

    uiHelper.$inject = ['$q', '$rootScope', 'layoutModel', 'headerModel', '$modal', 'appHelper'];
    function uiHelper($q, $rootScope, layoutModel, headerModel, $modal, appHelper) {
        //private variables
        var uiModal = null;

        //#region exports
        /**************************************************************************************************
         * <summary>    Interface. </summary>
         **************************************************************************************************/
        return {
            activateController: activateController,
            activeHeaderItem: activeHeaderItem,

            mask: mask,

            showModal: showModal,
            hideModal: hideModal,
            setPageTitle: setPageTitle,
            setLayout: setLayout
        };
        //#endregion

        //#region private
        /**************************************************************************************************
         * <summary> Show loading screen. </summary>
         *
         * <param name="value"> true (show) || false (hide). </param>
         *
         * <returns> . </returns>
         **************************************************************************************************/
        function mask(value) {
            new layoutModel().shared().showLoading = value;
        }

        /**************************************************************************************************
         * <summary> Set the page title. </summary>
         *
         * <param name="value"> Title of page. </param>
         *
         * <returns> . </returns>
         **************************************************************************************************/
        function setPageTitle(value) {
            $rootScope.title = value;
        }

        /**************************************************************************************************
         * <summary> Activate the controller. </summary>
         *
         * <param name="promises"> The promises that need to execute before activing controller. </param>
         * <param name="controllerID"> Identifier for the controller. </param>
         *
         * <returns> . </returns>
         **************************************************************************************************/
        function activateController(promises, controllerID) {
            return $q.all(promises).then(function () { appHelper.preloadNecessaryData(); });
        }

        function activeHeaderItem(index) {
            headerModel.currentItem = index;
        }

        /**************************************************************************************************
         * <summary> Show the bootstrap modal. </summary>
         *
         * <param name="page"> path to template file. </param>
         *
         * <returns> uiModal instance. </returns>
         **************************************************************************************************/
        function showModal(page) {
            uiModal = $modal.open({
                templateUrl: page
            });
            return uiModal;
        }

        /**************************************************************************************************
         * <summary> Hide the current bootstrap modal. </summary>
         *
         * <returns> . </returns>
         **************************************************************************************************/
        function hideModal() {
            uiModal && uiModal.dismiss('cancel');
        }

        /**************************************************************************************************
         * <summary> Sets a layout. </summary>
         *
         * <param name="name"> Name of layout template file. </param>
         *
         * <returns> . </returns>
         **************************************************************************************************/
        function setLayout(name) {
            $rootScope.layout = utils.viewPath('shared/layout', name);
        }
        //#endregion
    }
})();