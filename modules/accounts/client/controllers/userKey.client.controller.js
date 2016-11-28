(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('UserKeyController', UserKeyController);

  UserKeyController.$inject = ['AccountsService', '$state', 'CryptoService'];

  function UserKeyController(AccountsService, $state, CryptoService) {
    var vm = this;
    vm.userKey= CryptoService.getUserKey();
    if(!vm.userKey){
      $state.go('accounts.userKey');
    }
    vm.setKey = function(input){
      vm.userKey = input;
      CryptoService.setUserKey(input);
      $state.go('accounts.list');
    };
  }
}());
