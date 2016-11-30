(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('AccountsListController', AccountsListController);

  AccountsListController.$inject = ['AccountsService', '$state', 'CryptoService'];

  function AccountsListController(AccountsService, $state, CryptoService) {
    var vm = this;
    AccountsService.getCurrentUsersAccounts().then(function (res) {
      var decrypted = CryptoService.decryptObjectArray(res.data);
      vm.accounts = decrypted;
    });

    vm.deleteAccount = function (selectedAccount) {
      AccountsService.deleteSelectedAccount(selectedAccount);
      $state.reload();
    };
  }
} ());
