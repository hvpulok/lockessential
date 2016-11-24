// Accounts service used to communicate Accounts REST endpoints
(function () {
  'use strict';

  angular
    .module('accounts')
    .factory('AccountsService', AccountsService);

  AccountsService.$inject = ['$resource'];

  function AccountsService($resource) {
    var resource = $resource('api/accounts/:accountId', {
      accountId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    var getAllAccounts = function () {
      return resource.query();
    };

    var getSelectedAccount = function (selectedAccount) {
      return resource.get({ accountId: selectedAccount });
    };

    var updateSelectedAccount = function (selectedAccount) {
      return resource.put({ accountId: selectedAccount });
    };

    var deleteSelectedAccount = function (selectedAccount) {
      return resource.delete({ accountId: selectedAccount });
    };

    return {
      resource : resource,
      getAllAccounts: getAllAccounts,
      getSelectedAccount: getSelectedAccount,
      updateSelectedAccount: updateSelectedAccount,
      deleteSelectedAccount: deleteSelectedAccount
    };
  }
} ());
