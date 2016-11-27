// Accounts service used to communicate Accounts REST endpoints
(function () {
  'use strict';
  angular
    .module('accounts')
    .factory('CryptoService', CryptoService);

  CryptoService.$inject = [];

  function CryptoService() {
    var encryptText = function (inputText, code) {
      var ciphertext = CryptoJS.AES.encrypt(inputText, code); // jshint ignore:line
      return ciphertext.toString();
    };

    var decryptText = function (ciphertext, code) {
      var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), code); // jshint ignore:line
      if (bytes) {
        var plaintext = bytes.toString(CryptoJS.enc.Utf8); // jshint ignore:line
        return plaintext;
      } else {
        return '';
      }
    };

    var encryptObject = function (inputObject, code) {
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(inputObject), code); // jshint ignore:line
      return ciphertext.toString();
    };

    var decryptObject = function (ciphertext, code) {
      var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), code); // jshint ignore:line
      if (bytes) {
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); // jshint ignore:line
        return decryptedData;
      } else {
        return '';
      }
    };

    return {
      encryptText: encryptText,
      decryptText: decryptText,
      encryptObject: encryptObject,
      decryptObject: decryptObject,
    };
  }
} ());
