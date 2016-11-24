(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('AccountsListController', AccountsListController);

  AccountsListController.$inject = ['AccountsService', '$state'];

  function AccountsListController(AccountsService, $state) {
    var vm = this;

    vm.accounts = AccountsService.getAllAccounts();

    vm.deleteAccount = function(selectedAccount){
      AccountsService.deleteSelectedAccount(selectedAccount);
      $state.reload();
    };
  }
}());
