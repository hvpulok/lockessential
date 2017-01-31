(function () {
  'use strict';

  //password generator directive: usage as element
  // <password-generator length="15" use-numbers-only="false"></password-generator>
  // <password-generator length="4"></password-generator>

  angular.module('accounts')
    .directive('passwordGenerator', passwordGenerator);

  passwordGenerator.$inject = ['CryptoService'];

  // function to generate password
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  var generateRandomPassword = function(len, chars, num, punc, capchars){
    var length = len || 10;
    var string = chars || "abcdefghjkmnpqrstwxyz"; //to upper  //no l to avoid confusion with numbers
    var capChars = capchars || "ABCDEFGHJKMNPQRSTWXYZ"; 
    var numeric = num || '23456789';
    var punctuation = punc || '!@#$%^&*()_+~`}{[]\:;?><,./-=';
    var password = "";
    var pos = ['entity1', 'entity2', 'entity3', 'entity4'];
    var passChar = {};
    while( password.length <= length ) {
        passChar.entity1 = string.charAt(Math.ceil(string.length * Math.random()*Math.random()));
        passChar.entity2 = numeric.charAt(Math.ceil(numeric.length * Math.random()*Math.random()));
        passChar.entity3 = punctuation.charAt(Math.ceil(punctuation.length * Math.random()*Math.random()));
        passChar.entity4 = capChars.charAt(Math.ceil(capChars.length * Math.random()*Math.random()));
        
        var shuffledPos = shuffle(pos);
        for(var i=0; i<shuffledPos.length; i++){
          password+= passChar[shuffledPos[i]];
        }
    }
    return password.slice(0,length);
  };

  //start of directive function
  function passwordGenerator() {
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
        $scope.passwords[0] =  generateRandomPassword(Math.round($scope.length), chars , nums, punc, capChars);
        $scope.passwords[1] =  generateRandomPassword(Math.round($scope.length), chars , nums, punc, capChars);
        $scope.passwords[2] =  generateRandomPassword(Math.round($scope.length), chars , nums, punc, capChars);
        $scope.passwords[3] =  generateRandomPassword(Math.round($scope.length), chars , nums, punc, capChars);
        $scope.passwords[4] =  generateRandomPassword(Math.round($scope.length), chars , nums, punc, capChars);
      };
    }
  }
} ());
