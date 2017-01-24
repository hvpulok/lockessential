(function () {
  'use strict';

  angular
    .module('accounts')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('accounts', {
        abstract: true,
        url: '/accounts',
        template: '<ui-view/>'
      })
      .state('accounts.list', {
        url: '',
        templateUrl: '/modules/accounts/client/views/list-accounts.client.view.html',
        controller: 'AccountsListController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          needUserKey: true,
          pageTitle: 'Accounts List'
        }
      })
      .state('accounts.userKey', {
        url: '/userkey',
        templateUrl: '/modules/accounts/client/views/userKey.client.view.html',
        controller: 'UserKeyController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'User Key',
        },
        params: {
          accountId: null
        }
      })
      .state('accounts.userKeyEmail', {
        url: '/emaileduserkey?token&key',
        controller: 'UserKeyEmailController',
        controllerAs: 'vm',
        templateUrl: '/modules/accounts/client/views/userKey-email.client.view.html',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Emailed User Key'
        }
      })
      .state('accounts.create', {
        url: '/create',
        templateUrl: '/modules/accounts/client/views/form-account.client.view.html',
        controller: 'AccountsController',
        controllerAs: 'vm',
        resolve: {
          account: newAccount
        },
        data: {
          roles: ['user', 'admin'],
          needUserKey: true,
          pageTitle: 'Accounts Create'
        }
      })
      .state('accounts.edit', {
        url: '/:accountId/edit',
        templateUrl: '/modules/accounts/client/views/form-account.client.view.html',
        controller: 'AccountsController',
        controllerAs: 'vm',
        resolve: {
          account: getAccount
        },
        data: {
          roles: ['user', 'admin'],
          needUserKey: true,
          pageTitle: 'Edit Account {{ account.name }}'
        }
      })
      .state('accounts.view', {
        url: '/:accountId',
        templateUrl: '/modules/accounts/client/views/form-account.client.view.html',
        controller: 'AccountsController',
        controllerAs: 'vm',
        resolve: {
          account: getAccount
        },
        data: {
          roles: ['user', 'admin'],
          needUserKey: true,
          pageTitle: 'Account {{ account.name }}',
          isViewMode: true
        }
      });
  }

  getAccount.$inject = ['$stateParams', 'AccountsService'];

  function getAccount($stateParams, AccountsService) {
    return AccountsService.resource.get({
      accountId: $stateParams.accountId
    }).$promise;
  }

  // checkUserKey.$inject = ['CryptoService', '$state'];
  // function checkUserKey(CryptoService, $state) {
  //   if (!CryptoService.getUserKey()) {
  //     $state.go('accounts.userKey');
  //   } else {
  //     return (CryptoService.getUserKey()).$promise;
  //   }
  // }

  newAccount.$inject = ['AccountsService'];

  function newAccount(AccountsService) {
    return new AccountsService.resource();
  }
} ());
