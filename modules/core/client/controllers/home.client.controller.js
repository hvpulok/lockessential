(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);
  HomeController.$inject = ['Authentication', '$uibModal', '$document'];
  function HomeController(Authentication, $uibModal, $document) {
    var vm = this;
    vm.authentication = Authentication;
    vm.isLoggedIn = function () {
      if (Authentication.user)
        return true;
      else
        return false;
    };

    // code to control video modal
    // pluker ref: https://plnkr.co/edit/refQWzOOsyLYwaoDwP5b?p=preview
    vm.animationsEnabled = true;
    vm.open = function (size, parentSelector) {
      var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.video-modal ' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: 'vm',
        size: size,
        appendTo: parentElem,
        resolve: {
        }
      });
    };
  }


  angular.module('core').controller('ModalInstanceCtrl', function ($uibModalInstance) {
    var vm = this;
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

  // Please note that the close and dismiss bindings are from $uibModalInstance.
  angular.module('core').component('modalComponent', {
    templateUrl: 'myModalContent.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: function () {
      var vm = this;
      vm.cancel = function () {
        vm.dismiss();
      };
    }
  });


} ());
