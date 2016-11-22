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
        templateUrl: 'modules/accounts/client/views/list-accounts.client.view.html',
        controller: 'AccountsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Accounts List'
        }
      })
      .state('accounts.create', {
        url: '/create',
        templateUrl: 'modules/accounts/client/views/form-account.client.view.html',
        controller: 'AccountsController',
        controllerAs: 'vm',
        resolve: {
          accountResolve: newAccount
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Accounts Create'
        }
      })
      .state('accounts.edit', {
        url: '/:accountId/edit',
        templateUrl: 'modules/accounts/client/views/form-account.client.view.html',
        controller: 'AccountsController',
        controllerAs: 'vm',
        resolve: {
          accountResolve: getAccount
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Account {{ accountResolve.name }}'
        }
      })
      .state('accounts.view', {
        url: '/:accountId',
        templateUrl: 'modules/accounts/client/views/view-account.client.view.html',
        controller: 'AccountsController',
        controllerAs: 'vm',
        resolve: {
          accountResolve: getAccount
        },
        data: {
          pageTitle: 'Account {{ accountResolve.name }}'
        }
      });
  }

  getAccount.$inject = ['$stateParams', 'AccountsService'];

  function getAccount($stateParams, AccountsService) {
    return AccountsService.get({
      accountId: $stateParams.accountId
    }).$promise;
  }

  newAccount.$inject = ['AccountsService'];

  function newAccount(AccountsService) {
    return new AccountsService();
  }
}());
