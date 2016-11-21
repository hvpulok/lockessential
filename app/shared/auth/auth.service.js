'use strict';

angular.module('myApp.informationManager')
    .factory("AuthService", ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
        var url = {
            SIGN_UP: '/signup',
            LOGIN: '/login',
            LOGOUT: '/logout',
            CURRENT_USER: '/current_user',
        };
        var _getCurrentUser = function(){
            return $http.get(url.CURRENT_USER);
        };

        var _signup = function (user) {
            return $http.post(url.SIGN_UP, user);
        };

        var _login = function (user) {
            return $http.post(url.LOGIN, user);
        };

        var _logout = function () {
            $rootScope.currentUser = {};
            return $http.get(url.LOGOUT);
        };

        return {
            signup: _signup,
            login: _login,
            logout: _logout,
            getCurrentUser : _getCurrentUser
        }
    }]);