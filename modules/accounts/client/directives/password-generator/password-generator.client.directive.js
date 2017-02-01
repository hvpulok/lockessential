(function () {
  'use strict';

  //password generator directive: usage as element
  // <password-generator options="vm.pwgOptions" ></password-generator>
  // possible options which needs to be defined in controller:
    // vm.pwgOptions = {
    //   length: 4,
    //   isUseNumbersOnly: false,
    //   isUseNumbers: true,
    //   isUseSpecialChars: true,
    //   smallCharSets: 'abcdefghjkmnpqrstwxyz',
    //   capCharSets: 'ABCDEFGHJKMNPQRSTWXYZ',
    //   numericSets: '23456789',
    //   punctuationSets: '!@#$%^&*?'
    // };

  angular.module('accounts')
    .directive('passwordGenerator', passwordGenerator);

  passwordGenerator.$inject = ['passwordGeneratorService'];

  //start of directive function
  function passwordGenerator(passwordGeneratorService) {
    var directive = {
      restrict: 'E',
      scope: { options: '=' },
      templateUrl: '/modules/accounts/client/directives/password-generator/password-generator.client.template.html',
      link: link,
      controller: controller
    };

    return directive;

    function link(scope, element, attrs) {
      scope.checkUserNumberOnly();
      scope.genPassword();
    }

    function controller($scope) {
      $scope.checkUserNumberOnly = function () {
        if ($scope.options.isUseNumbersOnly) {
          $scope.options.isUseNumbers = false;
          $scope.options.isUseSpecialChars = false;
        } else {
          $scope.options.isUseNumbers = true;
          $scope.options.isUseSpecialChars = true;
        }
      };

      $scope.removeNumberOnly = function () {
        $scope.options.isUseNumbersOnly = false;
      };

      $scope.genPassword = function () {
        $scope.passwords = [];
        //number of passwords to generate
        var numberOfPassWordsToGenerate = 5;
        for (var i = 0; i < numberOfPassWordsToGenerate; i++) {
          $scope.passwords[i] = passwordGeneratorService.generateRandomPassword($scope.options);
        }
      };
    }
  }
} ());
