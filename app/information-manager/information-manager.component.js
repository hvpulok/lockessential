'use strict';

angular.module('myApp.informationManager', ['ngRoute', 'information.data'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/information', {
	templateUrl: 'information-manager/information-manager.html',
	controller: 'InformationManagerCtrl'
  });
}])

.controller('InformationManagerCtrl',
	['InformationDataService',
		'$scope',
		function(InformationDataService, $scope) {

			$scope.test = 'Pulok'; // to check the unit testing functionality

			InformationDataService.getAllData()
				.then(function (data) {
					$scope.infoData = data;
				  }, function (error) {
					  console.log(error);
				  });
		}
	]
);