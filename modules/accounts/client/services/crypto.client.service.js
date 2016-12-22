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
        var ciphertext = CryptoJS.AES.encrypt(inputText, userKey); // eshint ignore:line
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
        var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), userKey); // eshint ignore:line
        var plaintext = bytes.toString(CryptoJS.enc.Utf8); // eshint ignore:line
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
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(inputObject), userKey); // eshint ignore:line
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
        var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), userKey); // eshint ignore:line
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); // eshint ignore:line
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

    return {
      setUserKey: setUserKey,
      getUserKey: getUserKey,
      encryptText: encryptText,
      decryptText: decryptText,
      encryptObject: encryptObject,
      decryptObject: decryptObject,
      decryptObjectArray: decryptObjectArray,
      getUserKeyValidity: getUserKeyValidity,
      checkIfuserKeyAvailable : checkIfuserKeyAvailable
    };
  }
} ());
