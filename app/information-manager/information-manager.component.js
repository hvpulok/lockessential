'use strict';

angular.module('myApp.informationManager', ['ngRoute', 'information.data'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/information', {
            templateUrl: 'information-manager/information-manager.html',
            controller: 'InformationManagerCtrl'
        });
    }])

    .controller('InformationManagerCtrl',
        ['InformationDataService', 'InfoDataClass',
            '$scope',
            function(InformationDataService, InfoDataClass, $scope) {

                $scope.test = 'Pulok'; // to check the unit testing functionality

                $scope.infoData = InformationDataService.query();

                $scope.getDetails = function (id) {
                    $scope.details =  InformationDataService.get({id: id});
                };

                $scope.newData = new InfoDataClass({});
                $scope.saveData = function(newData){
                    console.log(newData);
                }
            }
        ]
    );