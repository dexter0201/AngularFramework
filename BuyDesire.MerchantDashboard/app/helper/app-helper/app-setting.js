(function () {
    'use strict';

    var setting = {
        isAuthorized: true

    };


    angular
        .module('app')
        .value('setting', setting);
})();