// (function () {
//   'use strict';

//   angular
//     .module('accounts')
//     .run(menuConfig);

//   menuConfig.$inject = ['menuService'];

//   function menuConfig(menuService) {
//     // Set top bar menu items
//     menuService.addMenuItem('topbar', {
//       title: 'Accounts',
//       state: 'accounts',
//       type: 'dropdown',
//       roles: ['*']
//     });

//     // Add the dropdown list item
//     menuService.addSubMenuItem('topbar', 'accounts', {
//       title: 'List Accounts',
//       state: 'accounts.list'
//     });

//     // Add the dropdown create item
//     menuService.addSubMenuItem('topbar', 'accounts', {
//       title: 'Create Account',
//       state: 'accounts.create',
//       roles: ['user']
//     });
//   }
// }());

'use strict';

// Configuring the Articles module
angular.module('accounts').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
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
      roles: ['user']
    });
  }
]);
