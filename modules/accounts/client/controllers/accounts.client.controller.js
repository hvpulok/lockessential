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
    vm.cards = [1];
    vm.addCard = function(){
      vm.cards.push(vm.cards.length+1);
    };
    vm.removeCard = function(index){

      if(vm.cards.length>1){
        if(index){
          vm.cards.splice(index-1, 1);
        }else{
          vm.cards.pop();
        }
      }
    };

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
