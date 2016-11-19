'use strict';

angular.module('myApp.informationManager')
    .factory("AuthService", ['$http', '$q', function ($http, $q) {
        var url = {
            SIGN_UP: '/signup',
            LOGIN: '/login',
            LOGOUT: '/logout',
        };

        var _signup = function (user) {
            return $http.post(url.SIGN_UP, user);
        }
        var _login = function (user) {
            return $http.post(url.LOGIN, user);
        }

        return {
            signup: _signup,
            login: _login
        }
    }]);