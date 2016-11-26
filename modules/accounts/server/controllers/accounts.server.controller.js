'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = require(path.resolve('./modules/users/server/models/user.server.model')),
  Account = mongoose.model('Account'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

// crypto usage
// var AES = require("crypto-js/aes");
// var SHA256 = require("crypto-js/sha256");
var CryptoJS = require('crypto-js');

var encryptText = function(inputText, code){
  var ciphertext = CryptoJS.AES.encrypt(inputText, code);
  return ciphertext.toString();
};

var decryptText = function(ciphertext, code){
  var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), code);
  if(bytes){
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }else{
    return '';
  }
};

var encryptObject = function(inputObject, code){
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(inputObject), code);
  return ciphertext.toString();
};

var decryptObject = function(ciphertext, code){
  var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), code);
  if(bytes){
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }else{
    return 'z';
  }
};

exports.mycrypto = function(req, res){
  var edata = encryptObject([{id: 1}, {id: 2}], 'secret key 123');
  var data = decryptObject(edata, 'secret key 123');
  console.log(data);
  res.send('ok');
};

/**
 * Create a Account
 */
exports.create = function (req, res) {
  var account = new Account(req.body);
  account.author.username = req.user.username;
  account.author.id = req.user._id;

  account.save(function (err, savedAccount) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      User.findById(req.user._id, function (err, selectedUser) {
        if (err) {
          console.log(err);
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          selectedUser.accounts.push(savedAccount);
          selectedUser.save(function (err) {
            if (err) { 
              return res.status(501).send({
                message: errorHandler.getErrorMessage(err)
              });
            }
            else {
              res.jsonp(account);
            }
          });
        }
      });
    }
  });
};


// =============


/**
 * Show the current Account
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  
  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  var account = req.account ? req.account.toJSON() : {};
  var isOwner = (req.user && account.author && account.author.id.toString() === req.user._id.toString());
  if (!isOwner){
    return res.status(403).send({
      message: 'Unauthorized'
    });
  }
  account.isCurrentUserOwner = isOwner;
  res.jsonp(account);
};

/**
 * Update a Account
 */
exports.update = function (req, res) {
  var account = req.account;
  var isOwner = (req.user && account.author && account.author.id.toString() === req.user._id.toString());
  if (!isOwner){
    return res.status(403).send({
      message: 'Unauthorized'
    });
  }

  account = _.extend(account, req.body);

  account.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(account);
    }
  });
};

/**
 * Delete an Account
 */
exports.delete = function (req, res) {
  var account = req.account;
  var isOwner = (req.user && account.author && account.author.id.toString() === req.user._id.toString());
  if (!isOwner){
    return res.status(403).send({
      message: 'Unauthorized'
    });
  }
  account.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(account);
    }
  });
};

/**
 * List of Accounts
 */
exports.list = function (req, res) {
  Account.find().sort('-created').populate('user', 'displayName').exec(function (err, accounts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(accounts);
    }
  });
};

/**
 * Account middleware
 */
exports.accountByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Account is invalid'
    });
  }

  Account.findById(id).populate('user', 'displayName').exec(function (err, account) {
    if (err) {
      return next(err);
    } else if (!account) {
      return res.status(404).send({
        message: 'No Account with that identifier has been found'
      });
    }
    req.account = account;
    next();
  });
};
