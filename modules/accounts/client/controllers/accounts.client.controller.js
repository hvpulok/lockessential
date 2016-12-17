(function () {
  'use strict';

  // Accounts controller
  angular
    .module('accounts')
    .controller('AccountsController', AccountsController);

  AccountsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'account', 'CryptoService', 'AccountsService'];

  function AccountsController($scope, $state, $window, Authentication, account, CryptoService, AccountsService) {
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
    if ($state.current.data.isViewMode) {
      vm.isViewMode = $state.current.data.isViewMode;
    }

    vm.addCard = function () {
      vm.account.card.push({
        cardNumber: '',
        cardExpDate: '',
        nameOnCard: '',
        securityCode: '',
        cardType: '',
        creditLimit: ''
      });
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
    var dataModel = {
      web: {
        account: '',
        username: '',
        password: '',
        email: '',
        url: '',
        description: ''
      },
      bank: {
        bankName: '',
        acNumber: '',
        bankRoutingNumber: '',
        fullName: ''
      },
      card: [{
        cardNumber: '',
        cardExpDate: '',
        nameOnCard: '',
        securityCode: '',
        cardType: '',
        creditLimit: ''
      }
      ],
      miscs: ''
    };
    // Object.assign(vm.account, seed);
    Object.assign(vm.account, dataModel);


    // check if user data available in accountResource
    //if available we have to decryt for view
    if (vm.accountResource._id) {
      var decrypted = CryptoService.decryptObject(vm.accountResource.account);
      vm.account = decrypted;
      var obj;
      obj = Object.assign({}, vm.accountResource, vm.account);
      vm.account = obj;
    }

    // seeding dB ============Should be removed after dev mode==========
    // var seed = {
    //   web: {
    //     account: 'Amazon',
    //     username: 'hvpulok',
    //     password: 1234,
    //     email: 'hvpulok@gmail.com',
    //     url: 'www.amazon.com',
    //     description: 'My Amazon Account'
    //   },
    //   bank: {
    //     bankName: 'Ally',
    //     acNumber: 123478902654,
    //     bankRoutingNumber: 87823468,
    //     fullName: 'Md Kamrul Hasan Pulok'
    //   },
    //   card: [{
    //     cardNumber: 123456781234,
    //     cardExpDate: '08/21',
    //     nameOnCard: 'Kamrul H Pulok',
    //     securityCode: 123,
    //     cardType: 'Mastercard',
    //     creditLimit: 5000
    //   },
    //     {
    //       cardNumber: 555555555555,
    //       cardExpDate: '08/21',
    //       nameOnCard: 'Kamrul H Pulok',
    //       securityCode: 123,
    //       cardType: 'Mastercard',
    //       creditLimit: 5000
    //     }
    //   ],
    //   miscs: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    // };


     vm.copyFail = function (err) {
      console.error('Error!', err);
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
      // CryptoService.setUserKey(vm.userKey); // store in service for usage in accross the app in the user session
      var encrypted = CryptoService.encryptObject(vm.account);
      vm.accountResource.account = encrypted;
      if (vm.accountResource._id) {
        vm.accountResource.$update(successCallback, errorCallback);
      } else {
        vm.accountResource.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        AccountsService.updateAccountsTempStorage();
        $state.go('accounts.view', {
          accountId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
} ());
