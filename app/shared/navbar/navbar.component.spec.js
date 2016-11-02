describe('navbar module: ', function() {

    // Load the module that contains the `navbar` component before each test
    beforeEach(module('navbar'));

    // Test the controller
    describe('NavbarController', function() {
        var ctrl;

        beforeEach(inject(function($componentController) {
            ctrl = $componentController('navbar');
        }));

        it('should set the Navbar Brand title to My Manager - ', function() {
            expect(ctrl.appName).toBe('My Manager');
        });

    });
});
