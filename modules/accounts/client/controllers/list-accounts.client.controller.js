(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('AccountsListController', AccountsListController);

  AccountsListController.$inject = ['AccountsService', '$state'];

  function AccountsListController(AccountsService, $state) {
    var vm = this;

    // vm.accounts = AccountsService.getAllAccounts();
    // console.log(vm.accounts);
    
    AccountsService.getCurrentUsersAccounts().then(function(res){
      vm.accounts = res.data;
    });

    vm.deleteAccount = function(selectedAccount){
      AccountsService.deleteSelectedAccount(selectedAccount);
      $state.reload();
    };
  }
}());
