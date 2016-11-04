angular.module('information.data')
    .directive('addInformation', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: { inputData: '=newData'},
            templateUrl: 'shared/information-data/add-information.html'
        };
    });