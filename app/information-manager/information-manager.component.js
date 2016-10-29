'use strict';

angular.module('myApp.informationManager', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/information_manager', {
    templateUrl: 'information-manager/information-manager.html',
    controller: 'InformationManagerCtrl'
  });
}])

.controller('InformationManagerCtrl', [function() {

}]);