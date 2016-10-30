'use strict';

// Register `navbar` component, along with its associated controller and template
angular.module('navbar')
    .component('navbar', {
        templateUrl: 'shared/navbar/navbar.template.html',
        controller: function NavbarController($location) {
            this.appName = 'My Manager';
            this.currentNav = $location.path();

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