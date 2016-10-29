describe('navbar module: ', function() {

    // Load the module that contains the `navbar` component before each test
    beforeEach(module('navbar'));

    // Test the controller
    describe('NavbarController', function() {

        it('should set the Navbar Brand title to My Manager - ', inject(function($componentController) {
            var ctrl = $componentController('navbar');

            expect(ctrl.appName).toBe('My Manager');
        }));
    });
});
