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

        it('should set the initial navbar selection to information - ', function() {
            expect(ctrl.currentNav).toBe('information');
        });

        it('should be able to set current nav to user - ', function() {
            ctrl.setCurrentNav('user');
            expect(ctrl.currentNav).toBe('user');
        });

        it('should be able verify current nav - ', function() {
            ctrl.setCurrentNav('1');
            expect(ctrl.checkCurrentNav('1')).toBe(true);
            expect(ctrl.checkCurrentNav(1)).toBe(false);
            expect(ctrl.checkCurrentNav('information')).toBe(false);
        });
    });
});
