'use strict';

angular.module('myApp.informationManager')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'shared/auth/login/login.template.html',
            controller: 'loginCtrl'
        });
    }])

    .controller('loginCtrl',
    ['$scope', 'AuthService', '$location', '$rootScope',
        function ($scope, AuthService, $location, $rootScope) {
            $scope.login = function (user) {
                AuthService.login(user)
                    .then(
                    function (res) {
                        $rootScope.currentUser = res.data.currentUser;
                        $location.url('information');
                    }, function (error) {
                        $scope.errorMessage = error.data + "! Please try again"
                    })
            }
        }
    ]
    );
