'use strict';

angular.module('myApp.informationManager', ['ngRoute', 'information.data'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/information', {
            templateUrl: 'information-manager/information-manager.html',
            controller: 'InformationManagerCtrl'
        });
    }])

    .controller('InformationManagerCtrl',
    ['InformationDataService', 'InfoDataClass',
        '$scope', '$http','$rootScope',
        function (InformationDataService, InfoDataClass, $scope, $http, $rootScope) {
            if($rootScope.currentUser)
                $scope.currentUser = $rootScope.currentUser;
            else
                $scope.currentUser = "";

            //method to get all info from dB
            $scope.infoData = InformationDataService.query();

            //method to get specific info from dB
            $scope.getDetails = function (id) {
                $scope.details = InformationDataService.get({ id: id });
            };

            $scope.newData = new InfoDataClass({});
            $scope.newData.category = 'Website'; // initialize as default category
            var pristineNewData = angular.copy($scope.newData);

            //method to post new Info to dB
            $scope.saveData = function (newData) {
                InformationDataService.save(newData, function(res){
                    console.log(res);
                });

                $scope.newData = angular.copy(pristineNewData);
                $('#addInfoModal').modal('hide');
            }
        }
    ]
    );
//TODO: add ajax button to save button
//TODO: add validation formatting and error messages
//TODO: Update the current modal using angular UI Bootstrap modal 
