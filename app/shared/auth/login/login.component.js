'use strict';

angular.module('myApp.informationManager')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'shared/auth/login/login.template.html',
            controller: 'loginCtrl'
        });
    }])

    .controller('loginCtrl',
    ['$scope', 'AuthService', '$location',
        function ($scope, AuthService, $location) {
            $scope.login = function (user) {
                AuthService.login(user)
                    .then(
                    function (res) {
                        $location.url('information');
                    }, function (error) {
                        $scope.errorMessage = error.data + "! Please try again"
                    })
            }
        }
    ]
    );
