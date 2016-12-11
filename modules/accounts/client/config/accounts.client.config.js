(function () {
  'use strict';

  angular
    .module('accounts')
    .run(accountsRunPhase);

  accountsRunPhase.$inject = ['menuService', '$rootScope', '$state', 'CryptoService', 'AccountsService', 'Authentication'];

  function accountsRunPhase(menuService, $rootScope, $state, CryptoService, AccountsService, Authentication) {
    // Add the Accounts dropdown item
    menuService.addMenuItem('topbar', {
      title: 'Accounts',
      state: 'accounts',
      type: 'dropdown',
      roles: ['user', 'admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'accounts', {
      title: 'List Accounts',
      state: 'accounts.list',
      roles: ['user', 'admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'accounts', {
      title: 'Create Accounts',
      state: 'accounts.create',
      roles: ['user', 'admin']
    });

    $rootScope.$on('$stateChangeStart', function (event, toState) {
      var userKey = CryptoService.getUserKeyValidity().userKey;
      if (toState.data && toState.data.needUserKey && !userKey) {
        event.preventDefault();
        $state.go('accounts.userKey');
      }
    });

    //retrieve all user accounts data and store in array of AccountsService for future use
    if(Authentication.user){
      AccountsService.updateAccountsTempStorage();
    }
  }
} ());
