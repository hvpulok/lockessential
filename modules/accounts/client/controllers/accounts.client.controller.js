(function () {
  'use strict';

  // Accounts controller
  angular
    .module('accounts')
    .controller('AccountsController', AccountsController);

  AccountsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'accountResolve'];

  function AccountsController ($scope, $state, $window, Authentication, account) {
    var vm = this;
    vm.authentication = Authentication;
    vm.account = account;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.addCard = function(){
      vm.account.card.push({
        cardNumber: '',
        cardExpDate: '',
        nameOnCard: '',
        securityCode: '',
        cardType: '',
        creditLimit: ''
      });
    };
    vm.removeCard = function(index){
      if(vm.account.card.length>1){
        if(index){
          vm.account.card.splice(index-1, 1);
        }else{
          vm.account.card.pop();
        }
      }
    };
    // seeding dB ============Should be removed after dev mode==========
    var seed = {
      web: {
        account: 'Amazon',
        username: 'hvpulok',
        password: 1234,
        email: 'hvpulok@gmail.com',
        url: 'www.amazon.com',
        description: 'My Amazon Account'
      },
      bank: {
        bankName: 'Ally',
        acNumber: 123478902654,
        bankRoutingNumber: 87823468,
        fullName: 'Md Kamrul Hasan Pulok'
      },
      card: [{
        cardNumber: 123456781234,
        cardExpDate: '08/21',
        nameOnCard: 'Kamrul H Pulok',
        securityCode: 123,
        cardType: 'Mastercard',
        creditLimit: 5000
      },
        {
          cardNumber: 555555555555,
          cardExpDate: '08/21',
          nameOnCard: 'Kamrul H Pulok',
          securityCode: 123,
          cardType: 'Mastercard',
          creditLimit: 5000
        }
      ],
      miscs: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    };
    Object.assign(vm.account, seed);
    console.log(vm.account);
    // seeding dB ============Should be removed after dev mode============
    // Remove existing Account
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.account.$remove($state.go('accounts.list'));
      }
    }

    // Save Account
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.accountForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.account._id) {
        vm.account.$update(successCallback, errorCallback);
      } else {
        vm.account.$save(successCallback, errorCallback);
        console.log(vm.account);
      }

      function successCallback(res) {
        $state.go('accounts.view', {
          accountId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
