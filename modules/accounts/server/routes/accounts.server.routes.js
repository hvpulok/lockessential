'use strict';

/**
 * Module dependencies
 */
var accountsPolicy = require('../policies/accounts.server.policy'),
  accounts = require('../controllers/accounts.server.controller');

module.exports = function(app) {
  // Accounts Routes
  app.route('/api/accounts').all(accountsPolicy.isAllowed)
    .get(accounts.list)
    .post(accounts.create);

  app.route('/api/accounts/:accountId').all(accountsPolicy.isAllowed)
    .get(accounts.read)
    .put(accounts.update)
    .delete(accounts.delete);

  app.route('/crypto')
    .get(accounts.mycrypto);


  // Finish by binding the Account middleware
  app.param('accountId', accounts.accountByID);
};
