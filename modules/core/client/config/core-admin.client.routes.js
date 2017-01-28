(function () {
  'use strict';

  angular
    .module('core.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        templateUrl: '/modules/core/client/views/admin-home.client.view.html',
        data: {
          roles: ['admin']
        }
      });
  }
}());
