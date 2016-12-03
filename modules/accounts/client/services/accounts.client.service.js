// Accounts service used to communicate Accounts REST endpoints
(function () {
  'use strict';

  angular
    .module('accounts')
    .factory('AccountsService', AccountsService);

  AccountsService.$inject = ['$resource', '$http'];

  function AccountsService($resource, $http) {
    var resource = $resource('/api/accounts/:accountId', {
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

    var getCurrentUsersAccounts = function(){
      var url = '/api/users/current/accounts';
      return $http.get(url);
    };

    return {
      resource : resource,
      getAllAccounts: getAllAccounts,
      getSelectedAccount: getSelectedAccount,
      updateSelectedAccount: updateSelectedAccount,
      deleteSelectedAccount: deleteSelectedAccount,
      getCurrentUsersAccounts : getCurrentUsersAccounts
    };
  }
} ());
