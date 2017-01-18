(function () {
  'use strict';

  // Accounts controller
  angular
    .module('accounts')
    .controller('AccountsController', AccountsController);

  AccountsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'account', 'CryptoService', 'AccountsService', 'Notification'];

  function AccountsController($scope, $state, $window, Authentication, account, CryptoService, AccountsService, Notification) {
    var vm = this;
    //get userKey
    vm.userKey = CryptoService.getUserKey();
    if (CryptoService.getUserKey()) {
      vm.isUserKeyUpdated = true;
    } else {
      vm.isUserKeyUpdated = false;
    }
    vm.authentication = Authentication;
    vm.account = {}; // will store user input from input from
    vm.accountResource = account; // store ngResource object
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.isEmailThisUserKey = true; // email user key handler flag
    vm.isUserKeyInputBoxReadOnly = true;  //flag to make userKey input box readonly/editable
    vm.isShowUserKeyHelpBox = false;  //flag to show userKey reminder help box
    vm.isShowPassword = true;

    if ($state.current.data.isViewMode) {
      vm.isViewMode = $state.current.data.isViewMode;
    }

    vm.gotoTop = function(){
      $window.scroll(0,0);
    };
    
    vm.tinymceOptions = {
        height: 300,
        readonly : vm.isViewMode,
        menubar: !vm.isViewMode,
        plugins: [
          'advlist autolink lists link image charmap',
          'code fullscreen emoticons',
          'insertdatetime media table contextmenu paste code'
          ],
        statusbar: false,
        toolbar: 'fullscreen undo redo bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent | indent emoticons',
      };
    
    //method to check miscs textarea charLimit and set forms validity
    vm.checkCharsCountLimit = function(charLimit){
      if(vm.account.miscs.length > charLimit){
        vm.form.accountForm.miscs.$setValidity('max-length', false);
      } else{
        vm.form.accountForm.miscs.$setValidity('max-length', true);
      }
    };
      
    vm.initializeACard = function () {
      if (vm.category === 'Bank' || vm.category === 'Card') {
        if (!vm.account.card) {
          vm.account.card = []; // if emty card initialize with empty array
          vm.account.card.push({
            cardNumber: '',
            cardExpDate: '',
            nameOnCard: '',
            securityCode: '',
            cardType: '',
            creditLimit: ''
          });
        }
      } 
      else {
        // deInitialize A Card if user clicked bank/card by which a card might have initialized
        if (vm.account.card) {
          delete vm.account.card;
        }
      }
    };

    vm.addCard = function () {
      if (!vm.account.card) {
        vm.account.card = []; // if emty card initialize with empty array
        vm.account.card.push({
          cardNumber: '',
          cardExpDate: '',
          nameOnCard: '',
          securityCode: '',
          cardType: '',
          creditLimit: ''
        });
      } else {
        vm.account.card.push({
          cardNumber: '',
          cardExpDate: '',
          nameOnCard: '',
          securityCode: '',
          cardType: '',
          creditLimit: ''
        });
      }
    };
    vm.removeCard = function (index) {
      if (vm.account.card.length > 1) {
        if (index) {
          vm.account.card.splice(index - 1, 1);
        } else {
          vm.account.card.pop();
        }
      }
    };
    // check if user data available in accountResource
    //if available we have to decryt for view
    if (vm.accountResource._id) {
      var decrypted = CryptoService.decryptObject(vm.accountResource.account);
      vm.account = decrypted;
      vm.title = vm.accountResource.title;
      vm.category = vm.accountResource.category;
      vm.isEmailThisUserKey = false; //to uncheck email checkbox

      //==============temp code to replace description with miscs======================
      if(vm.account.web && vm.account.web.description && vm.account.web.description.length > 0){
        console.log('deleting old description...');
        var test = angular.copy(vm.account.web.description);
        if(vm.account.miscs.length > 0){
          vm.account.miscs = vm.account.miscs + '\n' + test;
        }else{
          vm.account.miscs = test;
        }
        delete vm.account.web.description;
      }
      //==============temp code to replace description with miscs======================
    }

    vm.toggleShowPassword = function(){
      vm.isShowPassword = !vm.isShowPassword;
    };

    vm.toggleUserKeyInputBoxReadOnlyMode = function(){
      vm.isUserKeyInputBoxReadOnly = !vm.isUserKeyInputBoxReadOnly;
    };

    vm.showUserKeyHelpBox = function(){
      vm.isShowUserKeyHelpBox = true;
    };
    vm.hideUserKeyHelpBox = function(){
      vm.isShowUserKeyHelpBox = false;
    };

    vm.copyFail = function (err) {
      Notification.danger({ delay: 3000, title: '<i class="glyphicon glyphicon-remove"></i> Failed', message: 'Copy Failed' });
    };

    vm.copySuccess = function () {
      Notification.success({ delay: 2000, title: '<i class="glyphicon glyphicon-ok"></i> Success', message: 'Copied Successfully' });
    };


    // Remove existing Account
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.accountResource.$remove(function () {
          AccountsService.updateAccountsTempStorage();
          $state.go('accounts.list');
        });
      }
    }

    vm.deleteAccount = function (selectedAccount) {
      if ($window.confirm("Are You Sure You Want To Delete?")) {
        AccountsService.deleteSelectedAccount(selectedAccount);
        Notification.warning({ delay: 3000, title: '<i class="glyphicon glyphicon-ok"></i> Success', message: 'Successfully Deleted' });
        $state.go('accounts.list');
      }
    };
    // Save Account
    function save(isValid) {
      CryptoService.setUserKey(vm.userKey);
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.accountForm');
        return false;
      }

      var encrypted = CryptoService.encryptObject(vm.account);
      vm.accountResource.account = encrypted;
      vm.accountResource.title = vm.title;
      vm.accountResource.category = vm.category;
      if (vm.accountResource._id) {
        vm.accountResource.$update(successCallback, errorCallback);
      } else {
        vm.accountResource.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        AccountsService.updateAccountsTempStorage();
        if (vm.isEmailThisUserKey) {
          vm.gotoTop();
          var key = {
            id: vm.accountResource._id,
            Account_title : vm.title,
            userKey : vm.userKey
          };
          AccountsService.emailUserKey(key)
            .success(function (res) {
              Notification.success({ delay: 5000, title: '<i class="glyphicon glyphicon-ok"></i> Saved Successfully', message: '<strong>Reminder!</strong> We do not store your user key. An Email was sent with your user key decryption link. Do not delete it.' });
            })
            .catch(function (err) {
              Notification.error({ delay: 5000, title: '<i class="glyphicon glyphicon-remove"></i> Failed', message: 'An Error occurred! Email was not sent.' });
            });
        }
        else {
          vm.gotoTop();
          Notification.success({ delay: 2500, title: '<i class="glyphicon glyphicon-ok"></i> Success', message: 'Saved Successfully' });
        }

        $state.go('accounts.view', {
          accountId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        Notification.error({ delay: 5000, title: '<i class="glyphicon glyphicon-remove"></i> Failed', message: vm.error });
      }
    }
  }
} ());
