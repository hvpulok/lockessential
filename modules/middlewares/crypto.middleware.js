'use strict';
// crypto usage
// var AES = require("crypto-js/aes");
// var SHA256 = require("crypto-js/sha256");
var CryptoJS = require('crypto-js');

exports.encryptText = function(inputText, code){
  var ciphertext = CryptoJS.AES.encrypt(inputText, code);
  return ciphertext.toString();
};

exports.decryptText = function(ciphertext, code){
  var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), code);
  if(bytes){
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }else{
    return '';
  }
};

exports.encryptObject = function(inputObject, code){
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(inputObject), code);
  return ciphertext.toString();
};

exports.decryptObject = function(ciphertext, code){
  var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), code);
  if(bytes){
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }else{
    return '';
  }
};

// =============
// two object merger/extender helper function
exports.objectExtend = function(obj, src) {
  for (var key in src) {
    if (src.hasOwnProperty(key)) obj[key] = src[key];
  }
  return obj;
};