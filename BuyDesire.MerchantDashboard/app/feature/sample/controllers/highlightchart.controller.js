(function () {
    'use strict';
    var controllerID = 'highlightchartController';
    angular
        .module('app')
        .controller(controllerID, highlightchartController);

    highlightchartController.$inject = ['$scope','utils', '_', 'uiHelper', 'config'];
    function highlightchartController($scope,utils, _, uiHelper, config) {
        var vm = this;
        init();

        //#region exports

        //#endregion
        var data = [];

      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 30; j++) {
          var row = data[j] || {x: j};
          row['val_' + i] = Math.abs(Math.round(Math.sin((i+1)*j/5)*(5*(i+1))*1000)/1000);
          data[j] = row;
        }
      }

      $scope.data =  data;

       
      $scope.options = {
          //stacks: [{axis: "y", series: ["id_0"]}],
          lineMode: "cardinal",
          series: [
            {
                id: "id_0",
                y: "val_0",
                label: "Foo",
                type: "area",
                color: "#ff7f0e",
                axis: "y",
                thickness: "1px",
                visible: true
            },
            
          ],
          axes: {x: {type: "linear", key: "x"}, y: {type: "linear"}},
          tension: 0.7,
          tooltip: {mode: "scrubber"},
          drawLegend: true,
          drawDots: true,
          columnsHGap: 5
      };


        //#region private
        function init() {
            var promises = [updateUI()];
            uiHelper.activateController(promises, controllerID);
        }

        function updateUI() {
            uiHelper.setPageTitle(config.title.dashBoard);
            uiHelper.activeHeaderItem(1);
        }
        //#endregion
    }
})();