(function () {
    'use strict';

    angular
        .module('app')
        .factory('_', underscore);

    underscore.$inject = [];
    function underscore() {
        return window._;
    }
})();