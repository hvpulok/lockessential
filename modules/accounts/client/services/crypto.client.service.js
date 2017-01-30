// Accounts service used to communicate Accounts REST endpoints
(function () {
  'use strict';
  angular
    .module('accounts')
    .factory('CryptoService', CryptoService);

  CryptoService.$inject = ['$state'];

  function CryptoService($state) {
    var userKey = '';
    var isCurrentUserKeyValid = false;

    var checkIfuserKeyAvailable = function () {
      if (!userKey) {
        $state.go('accounts.userKey');
      }
    };

    var setUserKey = function (input) {
      userKey = input.toString();
    };

    var getUserKey = function () {
      return userKey;
    };

    var setUserKeyValidity = function (state) {
      isCurrentUserKeyValid = state;
    };

    var getUserKeyValidity = function () {
      return {
        isCurrentUserKeyValid: isCurrentUserKeyValid,
        userKey: userKey
      };
    };

    var encryptText = function (inputText) {
      checkIfuserKeyAvailable(); // check if user key available. if not getUserKey
      try {
        var ciphertext = CryptoJS.AES.encrypt(inputText, userKey); // jshint ignore:line
        setUserKeyValidity(true);
        return ciphertext.toString();
      }
      catch (error) {
        setUserKeyValidity(false);
        // userKey = ''; // reset the userKey to null as current userKey invalid
        return {
          errorTitle: 'An Error Occurred',
          message: error.message,
          error: error
        };
      }
    };

    var decryptText = function (ciphertext) {
      checkIfuserKeyAvailable(); // check if user key available. if not getUserKey
      try {
        var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), userKey); // jshint ignore:line
        var plaintext = bytes.toString(CryptoJS.enc.Utf8); // jshint ignore:line
        setUserKeyValidity(true);
        return plaintext;
      }
      catch (error) {
        setUserKeyValidity(false);
        // userKey = ''; // reset the userKey to null as current userKey invalid
        return {
          errorTitle: 'An Error Occurred',
          message: error.message,
          error: error
        };
      }
    };

    var encryptObject = function (inputObject) {
      checkIfuserKeyAvailable(); // check if user key available. if not getUserKey
      try {
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(inputObject), userKey); // jshint ignore:line
        setUserKeyValidity(true);
        return ciphertext.toString();
      }
      catch (error) {
        setUserKeyValidity(false);
        // userKey = ''; // reset the userKey to null as current userKey invalid
        return {
          errorTitle: 'An Error Occurred',
          message: error.message,
          error: error
        };
      }
    };

    var decryptObject = function (ciphertext) {
      checkIfuserKeyAvailable(); // check if user key available. if not getUserKey
      try {
        var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), userKey); // jshint ignore:line
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); // jshint ignore:line
        setUserKeyValidity(true);
        return decryptedData;
      }
      catch (error) {
        setUserKeyValidity(false);
        // userKey = ''; // reset the userKey to null as current userKey invalid
        return {
          errorTitle: 'An Error Occurred',
          message: error.message,
          error: error
        };
      }
    };

    var decryptObjectArray = function (inputArray) {
      checkIfuserKeyAvailable(); // check if user key available. if not getUserKey
      try {
        var updatedData = [];
        var lockUnlockStatus = {isUnableToUnlockSomeData: false}; // flag which will be used to notify users if any locked data available in the accounts list view
        inputArray.forEach(function (eachAccount) {
          var temp = JSON.parse(JSON.stringify(eachAccount));
          var data = decryptObject(temp.account, userKey);
          if(data.error){
            lockUnlockStatus.isUnableToUnlockSomeData = true;
          }
          // var obj = Object.assign({}, temp, data, lockUnlockStatus);
          var obj = Object.assign({}, temp, data);
          updatedData.push(obj);
        });
        setUserKeyValidity(true);
        return {
          updatedData : updatedData,
          isUnableToUnlockSomeData : lockUnlockStatus.isUnableToUnlockSomeData
        };
      } catch (error) {
        setUserKeyValidity(false);
        // userKey = ''; // reset the userKey to null as current userKey invalid
        return {
          errorTitle: 'An Error Occurred',
          message: error.message,
          error: error
        };
      }
    };


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

    var generateRandomPassword = function(len, str, num, punc){
      var length = len || 10;
      var string = str || "abcdefghjkmnpqrstuvwxyz"; //to upper  //no l to avoid confusion with numbers
      var numeric = num || '23456789';
      var punctuation = punc || '!@#$%^&*()_+~`}{[]\:;?><,./-=';
      var password = "";
      var pos = ['entity1', 'entity2', 'entity3', 'entity4'];
      var passChar = {};
      while( password.length < length ) {
          passChar.entity1 = string.charAt(Math.ceil(string.length * Math.random()*Math.random()));
          passChar.entity2 = numeric.charAt(Math.ceil(numeric.length * Math.random()*Math.random()));
          passChar.entity3 = punctuation.charAt(Math.ceil(punctuation.length * Math.random()*Math.random()));
          passChar.entity4 = string.charAt(Math.ceil(string.length * Math.random()*Math.random())).toUpperCase();
          
          var shuffledPos = shuffle(pos);
          for(var i=0; i<shuffledPos.length; i++){
            password+= passChar[shuffledPos[i]];
          }
      }
      return password.slice(0,length);
    };


    return {
      setUserKey: setUserKey,
      getUserKey: getUserKey,
      encryptText: encryptText,
      decryptText: decryptText,
      encryptObject: encryptObject,
      decryptObject: decryptObject,
      decryptObjectArray: decryptObjectArray,
      getUserKeyValidity: getUserKeyValidity,
      checkIfuserKeyAvailable : checkIfuserKeyAvailable,
      generateRandomPassword : generateRandomPassword
    };
  }
} ());
