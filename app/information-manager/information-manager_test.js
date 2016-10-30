'use strict';

describe('myApp.informationManager module', function() {

  beforeEach(module('myApp.informationManager'));
  beforeEach(module('information.data'));

  describe('InformationManagerCtrl controller - ', function(){
    var $scope;
    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller('InformationManagerCtrl', {$scope: $scope});
    }));

    it('should get test value as Pulok - ', function () {
      expect($scope.test).toBe('Pulok');
    });

    // next step is to check the informationDataService

  });
});