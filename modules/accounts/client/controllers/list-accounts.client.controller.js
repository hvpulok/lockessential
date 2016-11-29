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
      console.log(decrypted);
      //if error alert user
      vm.accounts = decrypted;
      // console.log(vm.accounts);
    });

    vm.deleteAccount = function (selectedAccount) {
      AccountsService.deleteSelectedAccount(selectedAccount);
      $state.reload();
    };
  }
} ());
