(function () {
    'use strict';

    var config = {
        api: {
            baseUrl: 'http://dev.api.buydesire.com'
        }
    };

    angular
        .module('app')
        .constant('configEnv', config);
})();