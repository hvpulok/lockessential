(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('AccountsListController', AccountsListController);

  AccountsListController.$inject = ['$scope', 'AccountsService', '$state', 'CryptoService', 'Notification' , '$window'];

  function AccountsListController($scope, AccountsService, $state, CryptoService, Notification, $window) {
    var vm = this;
    vm.isLoading = true;
    vm.isNoAccount = false; // used to show alert message to the user
    vm.isStateChangeRequested = false;  // used to show spinner if details/edit/delete button clicked

    vm.gotoTop = function(){
      $window.scroll(0,0);
    };
    vm.gotoTop(); // on page load the scroll should be on top of page
    
    //check if user accounts data already available in temp storage
    function updateDecryptedAccountsList(input){
      var decrypted = CryptoService.decryptObjectArray(input);
      vm.accounts = decrypted.updatedData;
      vm.isLoading = false;
      if(decrypted.isUnableToUnlockSomeData){
        vm.isUnableToUnlockSomeData = decrypted.isUnableToUnlockSomeData;
        Notification.info({ delay:10000, replaceMessage: true, title:'<i class="glyphicon glyphicon-ok"></i> Reminder!' ,message: 'There are some locked data.<br> Need their respective userkey to unlock.' });
      }
    }

    if(AccountsService.getAccountsTempStorage().isUpdated){
      var tempStorage = AccountsService.getAccountsTempStorage().data;
      if(tempStorage.length===0){
        vm.isNoAccount = true;
      }
      else{
        updateDecryptedAccountsList(tempStorage);
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
      if(receivedData.data.length===0){
        vm.isNoAccount = true;
      }
      updateDecryptedAccountsList(receivedData.data);
    });

    vm.reloadAccounts = function(){
      vm.isLoading = true;
      AccountsService.updateAccountsTempStorage();
    };

    vm.isLockedAccountShown = true;
    vm.showHideLockedAccount = function(){
      vm.isLockedAccountShown = !vm.isLockedAccountShown;
    };
    // sorting methods
    vm.propertyName = 'views.viewCount';
    vm.reverse = true;
    vm.sortBy = function(propertyName) {
      vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
      vm.propertyName = propertyName;
    };

    function successCallBack (data){
      AccountsService.updateAccountsTempStorage();
      $state.reload();
      Notification.success({ delay:3000, title:'<i class="glyphicon glyphicon-ok"></i> Success' ,message: 'Successfully Deleted' });
    }
    
    function errorCallBack (error){
      Notification.error({ delay:3000, title:'<i class="glyphicon glyphicon-remove"></i> Failed' ,message: 'Delete Unsuccessful' });
    }

    vm.showDetails = function(){
      vm.gotoTop();
      vm.isStateChangeRequested = true;
    };

    vm.editAccount = function(){
      vm.gotoTop();
      vm.isStateChangeRequested = true;
    };

    vm.deleteAccount = function (selectedAccount) {
      if( confirm("Are You Sure You Want To Delete?") ){
        vm.isStateChangeRequested = true;
        AccountsService.resource.delete({ accountId: selectedAccount }, successCallBack, errorCallBack);
      }
    };
  }
} ());
