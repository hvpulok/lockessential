(function () {
  'use strict';

  describe('Accounts Route Tests', function () {
    // Initialize global variables
    var $scope,
      AccountsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AccountsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AccountsService = _AccountsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('accounts');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/accounts');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          AccountsController,
          mockAccount;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('accounts.view');
          $templateCache.put('modules/accounts/client/views/view-account.client.view.html', '');

          // create mock Account
          mockAccount = new AccountsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Account Name'
          });

          // Initialize Controller
          AccountsController = $controller('AccountsController as vm', {
            $scope: $scope,
            accountResolve: mockAccount
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:accountId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.accountResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            accountId: 1
          })).toEqual('/accounts/1');
        }));

        it('should attach an Account to the controller scope', function () {
          expect($scope.vm.account._id).toBe(mockAccount._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/accounts/client/views/view-account.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AccountsController,
          mockAccount;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('accounts.create');
          $templateCache.put('modules/accounts/client/views/form-account.client.view.html', '');

          // create mock Account
          mockAccount = new AccountsService();

          // Initialize Controller
          AccountsController = $controller('AccountsController as vm', {
            $scope: $scope,
            accountResolve: mockAccount
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.accountResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/accounts/create');
        }));

        it('should attach an Account to the controller scope', function () {
          expect($scope.vm.account._id).toBe(mockAccount._id);
          expect($scope.vm.account._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/accounts/client/views/form-account.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AccountsController,
          mockAccount;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('accounts.edit');
          $templateCache.put('modules/accounts/client/views/form-account.client.view.html', '');

          // create mock Account
          mockAccount = new AccountsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Account Name'
          });

          // Initialize Controller
          AccountsController = $controller('AccountsController as vm', {
            $scope: $scope,
            accountResolve: mockAccount
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:accountId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.accountResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            accountId: 1
          })).toEqual('/accounts/1/edit');
        }));

        it('should attach an Account to the controller scope', function () {
          expect($scope.vm.account._id).toBe(mockAccount._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/accounts/client/views/form-account.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
