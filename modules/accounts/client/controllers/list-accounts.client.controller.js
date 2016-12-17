(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('AccountsListController', AccountsListController);

  AccountsListController.$inject = ['$scope', 'AccountsService', '$state', 'CryptoService', 'Notification'];

  function AccountsListController($scope, AccountsService, $state, CryptoService, Notification) {
    var vm = this;
    vm.isLoading = true;

    //check if user accounts data already available in temp storage
    if(AccountsService.getAccountsTempStorage().isUpdated){
      var tempStorage = AccountsService.getAccountsTempStorage().data;
      var decrypted = CryptoService.decryptObjectArray(tempStorage);
      vm.accounts = decrypted;
      vm.isLoading = false;
      Notification.info({ delay:3500, title:'<i class="glyphicon glyphicon-ok"></i> Reminder!' ,message: 'Showing only Unlocked Data.<br>Use options to show locked data.' });
    }
    else{
      // if not availabe in temp storage update temp storage
      vm.isLoading = true;
      AccountsService.updateAccountsTempStorage();
    }
    $scope.$on('event:newDataAvailable', function(event, receivedData){
      event.preventDefault();
      var decrypted = CryptoService.decryptObjectArray(receivedData.data);
      vm.accounts = decrypted;
      vm.isLoading = false;
    });
    
    vm.isLockedAccountShown = true;
    vm.showHideLockedAccount = function(){
      vm.isLockedAccountShown = !vm.isLockedAccountShown;
    }

    vm.deleteAccount = function (selectedAccount) {
      if( confirm("Are You Sure You Want To Delete?") ){
        var result = AccountsService.deleteSelectedAccount(selectedAccount);
        Notification.warning({ delay:3000, title:'<i class="glyphicon glyphicon-ok"></i> Success' ,message: 'Successfully Deleted' });
        $state.reload();
      }
    };
  }
} ());
