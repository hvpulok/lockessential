'use strict';

angular.module('myApp.informationManager')

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/signup', {
            templateUrl: 'shared/auth/signup/signup.template.html',
            controller: 'SignupCtrl'
        });
    }])

    .controller('SignupCtrl',
    ['$scope', 'AuthService', '$location','$rootScope',
        function($scope, AuthService, $location, $rootScope) {
            $scope.signup = function(user) {
                AuthService.signup(user).then(function(res) {
                    $rootScope.currentUser = res.data.currentUser;
                    $location.url('information');
                })
            }
        }
    ]
    );
