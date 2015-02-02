(function () {
    'use strict';

    angular
        .module('app', [
            //core
            'ngAnimate',
            'ngRoute',
            'ngCookies',

            //plugins
            'ui.bootstrap',
            'googlechart',
            'infinite-scroll',
            'cgBusy',
            'google-maps'.ns(),
            'ipCookie',
            'angularFileUpload'])
        .run(['$route', function ($route) { }]);
})();