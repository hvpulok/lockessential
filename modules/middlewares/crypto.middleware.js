'use strict';
// crypto usage
// var AES = require("crypto-js/aes");
// var SHA256 = require("crypto-js/sha256");
var CryptoJS = require('crypto-js');

exports.encryptText = function (inputText, code) {
  try {
    var ciphertext = CryptoJS.AES.encrypt(inputText, code);
    return ciphertext.toString();
  }
  catch (error) {
    return {
      title: 'An Error Occurred',
      message: error.message,
      error: error
    };
  }
};

exports.decryptText = function (ciphertext, code) {
  try {
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), code);
    if (bytes) {
      var plaintext = bytes.toString(CryptoJS.enc.Utf8);
      return plaintext;
    } else {
      return '';
    }
  }
  catch (error) {
    return {
      title: 'An Error Occurred',
      message: error.message,
      error: error
    };
  }
};

exports.encryptObject = function (inputObject, code) {
  try {
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(inputObject), code);
    return ciphertext.toString();
  }
  catch (error) {
    return {
      title: 'An Error Occurred',
      message: error.message,
      error: error
    };
  }
};

exports.decryptObject = function (ciphertext, code) {
  try {
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), code);
    if (bytes) {
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } else {
      return '';
    }
  }
  catch (error) {
    return {
      title: 'An Error Occurred',
      message: error.message,
      error: error
    };
  }
};

// =============
// two object merger/extender helper function
exports.objectExtend = function (obj, src) {
  for (var key in src) {
    if (src.hasOwnProperty(key)) obj[key] = src[key];
  }
  return obj;
};