(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('AccountsListController', AccountsListController);

  AccountsListController.$inject = ['AccountsService'];

  function AccountsListController(AccountsService) {
    var vm = this;

    vm.accounts = AccountsService.query();
  }
}());
