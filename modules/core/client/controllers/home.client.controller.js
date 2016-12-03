(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);
  HomeController.$inject = ['Authentication'];
  function HomeController(Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.isLoggedIn = function(){
      if(Authentication.user)
        return true;
      else
        return false;
    };
  }
}());
