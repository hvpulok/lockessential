angular.module('information.data')
    .directive('addInformation', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: { inputData: '=newData'},
            templateUrl: 'shared/information-data/add-information.html'
        };
    })
    .directive('editable', function(){
        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: 'shared/information-data/editable.html',
            require: '?^parentCtrl',
            scope: {'data': '=',
                    'item': '='    
            },
            controller: function($scope, $element, $attrs){
                $scope.isShown = false;
                $scope.setIsShown = function(state){
                    $scope.isShown = state;
                }
                $scope.save= function(){
                    $scope.isShown = false;
                    $scope.data[$scope.item] = $element.text();
                    console.log($scope.data);
                }
                
        },
            link: function(scope, elm, attr, controller){
                elm.attr('contenteditable','true');
            }
        };
    })