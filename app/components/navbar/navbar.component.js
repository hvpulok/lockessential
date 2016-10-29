'use strict';

// Register `navbar` component, along with its associated controller and template
angular.module('navbar')
    .component('navbar', {
        templateUrl: 'components/navbar/navbar.template.html',
        controller: function NavbarController() {
            this.appName = 'My Manager';
            this.currentNav ='information';

            //function to set current nav
            this.setCurrentNav = function (currentSelection) {
                this.currentNav = currentSelection;
            };

            //function to check current nav based on which active nav formatting done
            this.checkCurrentNav = function (nav) {
                return (this.currentNav === nav);
            };
        }
    });