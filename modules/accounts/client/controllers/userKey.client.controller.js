(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('UserKeyController', UserKeyController);

  UserKeyController.$inject = ['AccountsService', '$state', 'CryptoService', '$window'];

  function UserKeyController(AccountsService, $state, CryptoService, $window) {
    var vm = this;
    vm.isKeyShow = true; // flag to show user entered userkey while typing or not
    vm.gotoTop = function () {
      $window.scroll(0, 0);
    };
    vm.gotoTop(); // on page load the scroll should be on top of page

    vm.userKey = CryptoService.getUserKey();
    vm.setKey = function (input) {
      vm.userKey = input;
      CryptoService.setUserKey(input);
      if ($state.params.accountId) {
        $state.go('accounts.view', { accountId: $state.params.accountId });
      }
      else {
        $state.go('accounts.list');
      }
    };

    vm.toggleisKeyShow = function () {
      vm.isKeyShow = !vm.isKeyShow;
    };
  }
} ());
