(function () {
  'use strict';

  // add a floating button to go to top of the page
  // show/hides if >scrolly attrs as following example
  //<backtotop scrolly="200"></backtotop>
  
  angular.module('accounts')
    .directive('backtotop', backtotop);

  backtotop.$inject = ['$window'];

  function backtotop($window) {
    var directive = {
      restrict: 'E',
      scope: {},
      templateUrl: '/modules/accounts/client/directives/back-to-top.client.template.html',
      link: link,
      controller:controller
    };

    return directive;

    function link(scope, element, attrs) {
      scope.showBackToTopButton = false;
      function setScrollEventListener() {
        $window.onscroll = function () {
          if ($window.scrollY > attrs.scrolly) {
            scope.showBackToTopButton = true;
            scope.$digest();
          }
          else {
            scope.showBackToTopButton = false;
            scope.$digest();
          }
        };
      }
      scope.gotoTop = function(){
        scope.showBackToTopButton = false;
        $window.scroll(0,0);
      };

      setScrollEventListener();
      scope.gotoTop();

    }

    function controller($scope){
      
    }
  }
} ());
