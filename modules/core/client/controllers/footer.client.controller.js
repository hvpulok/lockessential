(function () {
  'use strict';

  angular
    .module('core')
    .controller('FooterController', FooterController);
  FooterController.$inject = ['$uibModal', '$document'];
  function FooterController($uibModal, $document) {
    var vm = this;

    // code to control modal
    // pluker ref: https://plnkr.co/edit/refQWzOOsyLYwaoDwP5b?p=preview
    vm.animationsEnabled = true;
    vm.open = function (size, parentSelector, selectedModalTemplate) {
      selectedModalTemplate = selectedModalTemplate+ 'ModalContent.html';
      var parentElem = parentSelector ?
        angular.element($document[0].querySelector('' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: selectedModalTemplate,
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
