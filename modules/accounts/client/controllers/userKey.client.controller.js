(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('UserKeyController', UserKeyController);

  UserKeyController.$inject = ['AccountsService', '$state', 'CryptoService'];

  function UserKeyController(AccountsService, $state, CryptoService) {
    var vm = this;
    vm.isKeyShow = true; // flag to show user entered userkey while typing or not

    vm.userKey= CryptoService.getUserKey();
    if(!vm.userKey){
      $state.go('accounts.userKey');
    }

    vm.setKey = function(input){
      vm.userKey = input;
      CryptoService.setUserKey(input);
      $state.go('accounts.list');
    };

    vm.toggleisKeyShow = function(){
      vm.isKeyShow = !vm.isKeyShow;
    };

  }
}());
