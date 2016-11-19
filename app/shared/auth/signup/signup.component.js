'use strict';

angular.module('myApp.informationManager')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/signup', {
            templateUrl: 'shared/auth/signup/signup.template.html',
            controller: 'SignupCtrl'
        });
    }])

    .controller('SignupCtrl',
    ['$scope',
        function ($scope) {
            $scope.signUpData = "SignUP Pulok";
        }
    ]
    );
