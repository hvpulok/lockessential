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
        template: `
          <header ng-include="'/modules/core/client/views/header.client.view.html'" class="navbar navbar-fixed-top navbar-inverse"></header>
          <div ui-view></div>
          <footer class="site-footer" ng-include="'/modules/core/client/views/footer.client.view.html'"></footer>
          `,
        data: {
          roles: ['admin']
        }
      });
  }
}());
