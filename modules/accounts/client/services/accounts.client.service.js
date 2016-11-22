// Accounts service used to communicate Accounts REST endpoints
(function () {
  'use strict';

  angular
    .module('accounts')
    .factory('AccountsService', AccountsService);

  AccountsService.$inject = ['$resource'];

  function AccountsService($resource) {
    return $resource('api/accounts/:accountId', {
      accountId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
