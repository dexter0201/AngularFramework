(function () {
    'use strict';

    angular
        .module('app')
        .factory('authHelper', authHelper);

    authHelper.$inject = ['_', 'config', '$cookies', '$cookieStore', 'currentUser', 'utils', 'ipCookie'];
    function authHelper(_, config, $cookies, $cookieStore, currentUser, utils, ipCookie) {
        //#region exports
        return {
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            isLoggedIn: isLoggedIn
        };
        //#endregion

        //#region private functions
        function getCurrentUser() {
            if (!currentUser.isNull()) {
                return currentUser;
            } else {
                var cookieValue = ipCookie('currentUser');
                if (!utils.isNull(cookieValue)) {
                    currentUser.set(cookieValue);
                    return currentUser;
                }
            }
            return null;
        }

        function isLoggedIn() {
            return getCurrentUser() != null;
        }

        function setCurrentUser(value) {
            currentUser.set(value);
            if (currentUser.Remember === true) {
                ipCookie("currentUser", JSON.stringify(value), { expires: 30 });
            }
            else {
                ipCookie('currentUser', null);
            }
        }
        //#endregion
    }
})();