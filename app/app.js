'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'myApp.informationManager',
    'myApp.bankManager',
    'myApp.version',
    'navbar',
    'information.data'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/', {redirectTo: '/information'});
    $routeProvider.otherwise({redirectTo: '/'});
}]);
