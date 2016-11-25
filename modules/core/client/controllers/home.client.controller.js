'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.isLoggedIn = function(){
      if(Authentication.user._id)
        return true;
      else
        return false;
    };
  }
]);
