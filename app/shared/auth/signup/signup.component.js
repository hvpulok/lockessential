'use strict';

angular.module('myApp.informationManager')

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/signup', {
            templateUrl: 'shared/auth/signup/signup.template.html',
            controller: 'SignupCtrl'
        });
    }])

    .controller('SignupCtrl',
    ['$scope', 'AuthService', '$location',
        function($scope, AuthService, $location) {
            $scope.signup = function(user) {
                AuthService.signup(user).then(function(res) {
                    $location.url('information');
                })
            }
        }
    ]
    );
