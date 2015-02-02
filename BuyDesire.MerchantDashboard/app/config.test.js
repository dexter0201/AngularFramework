(function () {
    'use strict';

    var config = {
        api: {
            baseUrl: 'http://test.api.buydesire.com'
        }
    };

    angular
        .module('app')
        .constant('configEnv', config);
})();