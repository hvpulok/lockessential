// Accounts service used to communicate Accounts REST endpoints
(function () {
  'use strict';
  angular
    .module('accounts')
    .factory('CryptoService', CryptoService);

  CryptoService.$inject = ['$state'];

  function CryptoService($state) {
    var userKey = '';

    var setUserKey = function (input) {
      userKey = input.toString();
    };

    var getUserKey = function () {
      return userKey;
    };

    var encryptText = function (inputText) {
      if (!userKey) {
        $state.go('accounts.userKey');
      }
      else {
        var ciphertext = CryptoJS.AES.encrypt(inputText, userKey); // jshint ignore:line
        return ciphertext.toString();
      }
    };

    var decryptText = function (ciphertext) {
      if (!userKey) {
        $state.go('accounts.userKey');
      }
      else {
        var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), userKey); // jshint ignore:line
        if (bytes) {
          var plaintext = bytes.toString(CryptoJS.enc.Utf8); // jshint ignore:line
          return plaintext;
        } else {
          return '';
        }
      }
    };

    var encryptObject = function (inputObject) {
      if (!userKey) {
        $state.go('accounts.userKey');
      }
      else {
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(inputObject), userKey); // jshint ignore:line
        return ciphertext.toString();
      }
    };

    var decryptObject = function (ciphertext) {
      if (!userKey) {
        $state.go('accounts.userKey');
      }
      else {
        var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), userKey); // jshint ignore:line
        if (bytes) {
          var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); // jshint ignore:line
          return decryptedData;
        } else {
          return '';
        }
      }
    };

    var decryptObjectArray = function (inputArray) {
      if (!userKey) {
        $state.go('accounts.userKey');
      }
      else {
        var updatedData = [];
        inputArray.forEach(function (eachAccount) {
          var temp = JSON.parse(JSON.stringify(eachAccount));
          var data = decryptObject(temp.account, userKey);
          var obj = Object.assign({}, temp, data);
          updatedData.push(obj);
        });
        return updatedData;
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
    };
  }
} ());
