(function () {
  'use strict';

  //password generator directive: usage as element
  // <password-generator length="15" use-numbers-only="false"></password-generator>
  // <password-generator length="4"></password-generator>

  angular.module('accounts')
    .directive('passwordGenerator', passwordGenerator);

  passwordGenerator.$inject = ['passwordGeneratorService'];

  //start of directive function
  function passwordGenerator(passwordGeneratorService) {
    var directive = {
      restrict: 'E',
      scope: {},
      templateUrl: '/modules/accounts/client/directives/password-generator/password-generator.client.template.html',
      link: link,
      controller:controller
    };

    return directive;

    function link(scope, element, attrs) {
      if(attrs.useNumbersOnly){
        scope.useNumbersOnly = attrs.useNumbersOnly;
      }
      if(attrs.length){
        scope.length = Math.round((Number(attrs.length)));
      }
      scope.checkUserNumberOnly();
      scope.genPassword();
    }

    function controller($scope){
      $scope.useNumbers = true;
      $scope.useSpecialChars = true;
      $scope.length = 15;

      $scope.checkUserNumberOnly = function(){
        if($scope.useNumbersOnly){
          $scope.useNumbers = false;
          $scope.useSpecialChars = false;
        }else{
          $scope.useNumbers = true;
          $scope.useSpecialChars = true;
        }
      };

      $scope.removeNumberOnly = function(){
          $scope.useNumbersOnly = false;
      };

      $scope.genPassword = function(){
        $scope.passwords = [];
        var chars = "abcdefghjkmnpqrstwxyz";
        var capChars = "ABCDEFGHJKMNPQRSTWXYZ";
        var nums = '23456789';
        var punc = '!@#$%^&*?';

        if(!$scope.useNumbers){
          nums=chars;
        }
        if(!$scope.useSpecialChars){
          punc= chars+nums+capChars;
        }

        if($scope.useNumbersOnly){
            $scope.useNumbers = false;
            $scope.useSpecialChars = false;
            nums = '1234567890';
            chars= '1234567890';
            punc= '1234567890';
            capChars = '1234567890';
        }
        $scope.passwords[0] =  passwordGeneratorService.generateRandomPassword(Math.round($scope.length), chars , nums, punc, capChars);
        $scope.passwords[1] =  passwordGeneratorService.generateRandomPassword(Math.round($scope.length), chars , nums, punc, capChars);
        $scope.passwords[2] =  passwordGeneratorService.generateRandomPassword(Math.round($scope.length), chars , nums, punc, capChars);
        $scope.passwords[3] =  passwordGeneratorService.generateRandomPassword(Math.round($scope.length), chars , nums, punc, capChars);
        $scope.passwords[4] =  passwordGeneratorService.generateRandomPassword(Math.round($scope.length), chars , nums, punc, capChars);
      };
    }
  }
} ());
