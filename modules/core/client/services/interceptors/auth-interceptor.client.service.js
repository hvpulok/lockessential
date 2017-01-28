(function () {
  'use strict';

  angular
    .module('core')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$q', '$injector', 'Authentication'];

  function authInterceptor($q, $injector, Authentication) {
    var service = {
      responseError: responseError
    };

    return service;

    function responseError(rejection) {
      var Notification = $injector.get('Notification');
      if (!rejection.config.ignoreAuthModule) {
        switch (rejection.status) {
          case 400:
            $injector.get('$state').go('bad-request', { message: rejection.data.message });
            break;
          case 401:
            // Deauthenticate the global user
            Notification.error({ delay:7000, replaceMessage: true, message: 'User Session Expired! Please Login.' });
            Authentication.user = null;
            $injector.get('$state').transitionTo('authentication.signin');
            break;
          case 403:
            Notification.error({ delay:7000, replaceMessage: true, message: 'Authorization Required! Please Login.' });
            Authentication.user = null;
            $injector.get('$state').transitionTo('authentication.signin');
            // $injector.get('$state').transitionTo('forbidden');
            break;
          case 404:
            $injector.get('$state').go('not-found', { message: rejection.data.message });
            break;
          case -1:  // Handle error if no response from server(Network Lost or Server not responding)
            Notification.error({ message: 'Server communication error! Please check your internet connection. Or please try again later.', delay: 7000 });
            break;
        }
      }
      // otherwise, default behaviour
      return $q.reject(rejection);
    }
  }
}());
