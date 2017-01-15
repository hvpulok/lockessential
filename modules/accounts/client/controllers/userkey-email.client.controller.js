(function () {
  'use strict';

  angular
    .module('accounts')
    .controller('UserKeyEmailController', UserKeyEmailController);

  UserKeyEmailController.$inject = ['$state','$stateParams', '$http', 'Notification', 'CryptoService'];

  function UserKeyEmailController($state, $stateParams,$http, Notification, CryptoService) {
    var vm = this;
    $http.get('/api/users/userkey/email/token?token='+ $stateParams.token + '&key=' + $stateParams.key)
    .success(function(res){
      vm.userKeyInfo = res;
      CryptoService.setUserKey(vm.userKeyInfo.userKey);
    })
    .error(function(err){
      // console.log(err);
      Notification.error({ delay: 10000, title: '<i class="glyphicon glyphicon-remove"></i> Failed', message: 'Unauthorized Attempt' });
      $state.go('authentication.signin');
    });
  }
}());