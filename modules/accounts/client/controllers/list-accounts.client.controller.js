(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('AccountsListController', AccountsListController);

  AccountsListController.$inject = ['AccountsService', '$state', 'CryptoService'];

  function AccountsListController(AccountsService, $state, CryptoService) {
    var vm = this;
    vm.isLoading = true;
    AccountsService.getCurrentUsersAccounts()
      .then(function (res) {
        var decrypted = CryptoService.decryptObjectArray(res.data);
        vm.accounts = decrypted;
      })
      .finally(function(){
        vm.isLoading = false;
      });
    vm.currentView = 'modules/accounts/client/views/partials/list-accounts.partials/list-accounts.tableView.client.view.html';
    vm.changeViewToList = function(){
      vm.currentView = 'modules/accounts/client/views/partials/list-accounts.partials/list-accounts.tableView.client.view.html';
    };
    vm.changeViewToCard = function(){
      vm.currentView = 'modules/accounts/client/views/partials/list-accounts.partials/list-accounts.cardView.client.view.html';
    };

    vm.deleteAccount = function (selectedAccount) {
      AccountsService.deleteSelectedAccount(selectedAccount);
      $state.reload();
    };
  }
} ());
