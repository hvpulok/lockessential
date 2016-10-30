angular.module('information.data')
    .directive('addInformation', function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'shared/information-data/add-information.html'
        };
    });