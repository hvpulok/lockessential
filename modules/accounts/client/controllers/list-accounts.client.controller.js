(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('AccountsListController', AccountsListController);

  AccountsListController.$inject = ['$scope', 'AccountsService', '$state', 'CryptoService'];

  function AccountsListController($scope, AccountsService, $state, CryptoService) {
    var vm = this;
    vm.isLoading = true;

    //check if user accounts data already available in temp storage
    if(AccountsService.getAccountsTempStorage().isUpdated){
      var tempStorage = AccountsService.getAccountsTempStorage().data;
      var decrypted = CryptoService.decryptObjectArray(tempStorage);
      vm.accounts = decrypted;
      vm.isLoading = false;
    }
    else{
      // if not availabe in temp storage update temp storage
      AccountsService.updateAccountsTempStorage();
      $scope.$on('event:newDataAvailable', function(event, receivedData){
        event.preventDefault();
        var decrypted = CryptoService.decryptObjectArray(receivedData.data);
        vm.accounts = decrypted;
        vm.isLoading = false;
      });
    }

    vm.currentView = '/modules/accounts/client/views/partials/list-accounts.partials/list-accounts.tableView.client.view.html';
    vm.changeViewToList = function(){
      vm.currentView = '/modules/accounts/client/views/partials/list-accounts.partials/list-accounts.tableView.client.view.html';
    };
    vm.changeViewToCard = function(){
      vm.currentView = '/modules/accounts/client/views/partials/list-accounts.partials/list-accounts.cardView.client.view.html';
    };

    vm.deleteAccount = function (selectedAccount) {
      AccountsService.deleteSelectedAccount(selectedAccount);
      $state.reload();
    };
  }
} ());
