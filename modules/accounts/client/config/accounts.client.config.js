(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$rootScope', '$state', 'CryptoService'];

  function menuConfig(menuService, $rootScope, $state, CryptoService) {
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
  }
} ());
