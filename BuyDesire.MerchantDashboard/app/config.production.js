(function () {
    'use strict';

    var config = {
        api: {
            baseUrl: 'https://api.buydesire.com'
        }
    };

    angular
        .module('app')
        .constant('configEnv', config);
})();