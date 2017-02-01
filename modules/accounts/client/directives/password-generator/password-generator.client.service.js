// Accounts service used to communicate Accounts REST endpoints
(function () {
  'use strict';

  angular
    .module('accounts')
    .factory('passwordGeneratorService', passwordGeneratorService);

  passwordGeneratorService.$inject = [];

  function passwordGeneratorService() {
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
    var generateRandomPassword = function (len, chars, num, punc, capchars) {
      var length = len || 10;
      var string = chars || "abcdefghjkmnpqrstwxyz"; //to upper  //no l to avoid confusion with numbers
      var capChars = capchars || "ABCDEFGHJKMNPQRSTWXYZ";
      var numeric = num || '23456789';
      var punctuation = punc || '!@#$%^&*()_+~`}{[]\:;?><,./-=';
      var password = "";
      var pos = ['entity1', 'entity2', 'entity3', 'entity4'];
      var passChar = {};
      while (password.length <= length) {
        passChar.entity1 = string.charAt(Math.ceil(string.length * Math.random() * Math.random()));
        passChar.entity2 = numeric.charAt(Math.ceil(numeric.length * Math.random() * Math.random()));
        passChar.entity3 = punctuation.charAt(Math.ceil(punctuation.length * Math.random() * Math.random()));
        passChar.entity4 = capChars.charAt(Math.ceil(capChars.length * Math.random() * Math.random()));

        var shuffledPos = shuffle(pos);
        for (var i = 0; i < shuffledPos.length; i++) {
          password += passChar[shuffledPos[i]];
        }
      }
      return password.slice(0, length);
    };
    return {
      generateRandomPassword: generateRandomPassword
    };
  }
} ());