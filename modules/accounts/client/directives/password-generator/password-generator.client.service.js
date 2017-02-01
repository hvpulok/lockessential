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

    var generateRandomPassword = function (customOptionsInput) {
      var defaultOptions = {
        length: 10,
        isUseNumbers: true,
        isUseSpecialChars: true,
        isUseNumbersOnly: false,
        smallCharSets: 'abcdefghjkmnpqrstwxyz',
        capCharSets: 'ABCDEFGHJKMNPQRSTWXYZ',
        numericSets: '23456789',
        punctuationSets: '!@#$%^&*()_+~`}{[]\:;?><,./-='
      };
      //update the options
      var options = Object.assign(defaultOptions, customOptionsInput);

      if (!options.isUseNumbers) {
        options.numericSets = options.smallCharSets + options.capCharSets;
      }
      if (!options.isUseSpecialChars) {
        options.punctuationSets = options.smallCharSets + options.capCharSets + options.numericSets;
      }

      if (options.isUseNumbersOnly) {
        options.isUseNumbers = false;
        options.isUseSpecialChars = false;
        options.numericSets = '1234567890';
        options.smallCharSets = '1234567890';
        options.punctuationSets = '1234567890';
        options.capCharSets = '1234567890';
      }

      var password = "";
      var pos = ['entity1', 'entity2', 'entity3', 'entity4'];
      var passChar = {};

      while (password.length <= options.length) {
        passChar.entity1 = options.smallCharSets.charAt(Math.ceil(options.smallCharSets.length * Math.random() * Math.random()));
        passChar.entity2 = options.numericSets.charAt(Math.ceil(options.numericSets.length * Math.random() * Math.random()));
        passChar.entity3 = options.punctuationSets.charAt(Math.ceil(options.punctuationSets.length * Math.random() * Math.random()));
        passChar.entity4 = options.capCharSets.charAt(Math.ceil(options.capCharSets.length * Math.random() * Math.random()));

        var shuffledPos = shuffle(pos);
        for (var i = 0; i < shuffledPos.length; i++) {
          password += passChar[shuffledPos[i]];
        }
      }
      return password.slice(0, options.length);
    };

    return {
      generateRandomPassword: generateRandomPassword
    };
  }
} ());