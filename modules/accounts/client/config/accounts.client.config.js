'use strict';

// Configuring the Accounts module
angular.module('accounts').run(['Menus',
  function (Menus) {
    // Add the Accounts dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Accounts',
      state: 'accounts',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'accounts', {
      title: 'List Accounts',
      state: 'accounts.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'accounts', {
      title: 'Create Accounts',
      state: 'accounts.create',
      roles: ['user', 'admin']
    });
  }
]);
