'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Account = mongoose.model('Account'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Account
 */
exports.create = function(req, res) {
  var account = new Account(req.body);
  account.user = req.user;

  account.save(function(err) {
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
 * Show the current Account
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var account = req.account ? req.account.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  account.isCurrentUserOwner = req.user && account.user && account.user._id.toString() === req.user._id.toString();

  res.jsonp(account);
};

/**
 * Update a Account
 */
exports.update = function(req, res) {
  var account = req.account;

  account = _.extend(account, req.body);

  account.save(function(err) {
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
exports.delete = function(req, res) {
  var account = req.account;

  account.remove(function(err) {
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
exports.list = function(req, res) {
  Account.find().sort('-created').populate('user', 'displayName').exec(function(err, accounts) {
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
exports.accountByID = function(req, res, next, id) {

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
