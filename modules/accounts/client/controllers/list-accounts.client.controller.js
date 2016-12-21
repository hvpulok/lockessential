(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('AccountsListController', AccountsListController);

  AccountsListController.$inject = ['$scope', 'AccountsService', '$state', 'CryptoService', 'Notification'];

  function AccountsListController($scope, AccountsService, $state, CryptoService, Notification) {
    var vm = this;
    vm.isLoading = true;
    vm.isNoAccount = false; // used to show alert message to the user

    //check if user accounts data already available in temp storage
    if(AccountsService.getAccountsTempStorage().isUpdated){
      var tempStorage = AccountsService.getAccountsTempStorage().data;
      if(tempStorage.length==0){
        vm.isNoAccount = true;
      }
      else{
        var decrypted = CryptoService.decryptObjectArray(tempStorage);
        vm.accounts = decrypted.updatedData;
        if(decrypted.isUnableToUnlockSomeData){
          vm.isUnableToUnlockSomeData = decrypted.isUnableToUnlockSomeData;
          Notification.info({ delay:5000, title:'<i class="glyphicon glyphicon-ok"></i> Reminder!' ,message: 'Showing only Unlocked Data.<br>Use options to show locked data.' });
        }
      }
      vm.isLoading = false;
    }
    else{
      // if not availabe in temp storage update temp storage
      vm.isLoading = true;
      AccountsService.updateAccountsTempStorage();
    }
    $scope.$on('event:newDataAvailable', function(event, receivedData){
      event.preventDefault();
      if(receivedData.data.length==0){
        vm.isNoAccount = true;
      }
      var decrypted = CryptoService.decryptObjectArray(receivedData.data);
      vm.accounts = decrypted.updatedData;
      vm.isLoading = false;
      if(decrypted.isUnableToUnlockSomeData){
        vm.isUnableToUnlockSomeData = decrypted.isUnableToUnlockSomeData;
      }
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
