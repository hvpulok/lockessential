'use strict';

// Register `navbar` component, along with its associated controller and template
angular.module('navbarComponentModule', [])
    .component('navbar', {
        templateUrl: 'components/navbar/navbar.template.html',
        controller: function NavbarController() {
            this.appName = 'My Manager';
        }
    });