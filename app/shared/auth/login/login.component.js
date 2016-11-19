'use strict';

angular.module('myApp.informationManager')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'shared/auth/login/login.template.html',
            controller: 'loginCtrl'
        });
    }])

    .controller('loginCtrl',
    ['$scope',
        function ($scope) {
            $scope.loginData = "login Pulok";
        }
    ]
    );
